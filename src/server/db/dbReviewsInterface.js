/**
 * This file contains the DBAccountsInterface class, handling all requests 
 * related users and their accounts.
 */

const { Db, ObjectID, Collection } = require("mongodb");
const reviewCollectionName = "Reviews";

/**
 * The type of a review
 * @enum {number}
 * @property Provider
 * @property Requester
 */
const ReviewType = 
{
    Provider : 0,
    Requester: 1
};

/**
 * @typedef User
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} password
 * @property {String} phone
 * @property {number} dateCreated
 */

/**
 * @typedef Review
 * @property {Number} value
 * @property {String} message
 * @property {Number} dateCreated
 * @property {String} creatorID
 * @property {String} requestID
 * @property {String} targetID
 */

/**
 * @typedef RatingData
 * @property {Number} averageRating
 * @property {Number} numRatings
 */
 
/**
 * Represents the public database interface related to accounts
 * @class
 */
class DBReviewsInterface
{
    /** @type {Db} @private */
    #database;
    /** @type {Collection} @private */
    #collection;

    /**
     * Creates a new DBAccountsInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database   = database;
        this.#collection = this.#database.collection(reviewCollectionName);
    }
    
    /**
     * Adds a review
     * @async
     * @param {String} userIDTo The id of the user the review is for
     * @param {String} userIDFrom The id of the user writing the review
     * @param {String} requestID The id of the request the review is related to
     * @param {String} message The message on the review
     * @param {number} value The rated score 0 - 5
     * @param {ReviewType} type The type of review 
     * @returns {Promise<Boolean>} If the review was added
     */
    async add(userIDTo, userIDFrom, requestID, message, value, type)
    {
        try
        {
            let collection      = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let otherCollection = type != ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let existing        = await this.#collection.aggregate([
                { $match:   { userID: ObjectID(userIDTo) }},
                { $project: { averageRating: `$${collection}.averageRating`,
                              numRatings:    `$${collection}.numRatings` }}
            ]).toArray();
            
            let rating = 
            {
                value: value,
                message: message,
                dateCreated: Date.now(),
                creatorID: ObjectID(userIDFrom),
                requestID: ObjectID(requestID)
            }
            
            if (existing.length == 0)
            {
                let review =
                {
                    userID: ObjectID(userIDTo),
                    [collection]:
                    {
                        averageRating: value,
                        numRatings: 1,
                        ratings: [rating]
                    },
                    [otherCollection]:
                    {
                        averageRating: 0,
                        numRatings: 0,
                        ratings: []
                    }
                };
                let result = await this.#collection.insertOne(review);
                return result.result.ok == 1 && result.result.n == 1;
            }
            else
            {
                let data = existing[0];
                let filter = 
                { 
                    _id: data._id,
                    [`${collection}.ratings.requestID`]: { $ne: ObjectID(requestID) }
                };
                let averageRating = data.averageRating + (value - data.averageRating) / (data.numRatings + 1);
                let update =
                {
                    $push:
                    {
                        [`${collection}.ratings`]: rating
                    },
                    $set:
                    {
                        [`${collection}.averageRating`]: averageRating,
                        [`${collection}.numRatings`]:    data.numRatings + 1
                    }
                };
                let result = await this.#collection.updateOne(filter, update);
                return result.result.ok == 1 && result.result.nModified == 1;
            }
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Updates a review
     * @async
     * @param {String} userID The id of the user that has the review
     * @param {String} requestID The id of the request related to the review
     * @param {ReviewType} type The type of review
     * @param {String} message The message on the review
     * @param {number} value The rated score 0 - 5
     * @returns {Promise<Boolean>} If the update was successful
     */
    async update(userID, requestID, type, message = undefined, value = undefined)
    {
        if (message == undefined && value == undefined) return false;

        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";

            let existing = await this.#collection.aggregate([
                { $match:   { userID: userID,
                              [`${collection}.ratings.requestID`]: ObjectID(requestID) }},
                { $project: { rating:        `$${collection}.ratings.${ObjectID(requestID)}`,
                              averageRating: `$${collection}.averageRating`,
                              numRatings:    `$${collection}.numRatings` }}
            ]).toArray();
            if (existing.length == 0) return false;
            
            let data = existing[0];
            let numRatings    = data.numRatings;
            let averageRating = data.averageRating + (value - data.averageRating) / numRatings;

            let newValues = { $set: { }};
            if (message !== undefined) newValues.$set[`${collection}.ratings.$.message`] = message;
            if (value   !== undefined)
            {
                newValues.$set[`${collection}.ratings.$.value`] = value;
                newValues.$set[`${collection}.averageRating`] = averageRating;
                newValues.$set[`${collection}.numRatings`] = numRatings;
            }
            
            let filter =
            {
                userID: ObjectID(userID),
                [`${collection}.ratings.requestID`]: ObjectID(requestID)
            };

            let result = await this.#collection.updateOne(filter, newValues);
            return result.result.ok == 1 && result.result.nModified == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Gets the rating data from a user
     * @async
     * @param {String} userID The user that has the reviews
     * @param {ReviewType} type The type of review data to get
     * @returns {?RatingData} The rating data or null
     */
    async getRating(userID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let result = await this.#collection.aggregate([
                { $match: { userID: userID }},
                { $unwind: `$${collection}.ratings` },
                { $project: { averageRating: `$${collection}.averageRating`,
                              numRatings:    `$${collection}.numRatings`,
                              _id: 0 }}
            ]).toArray();

            return result.length == 0 ? null : result[0];
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets a specific review to a user
     * @async
     * @param {String} userID The id of the user that has the review
     * @param {String} requestID The id of the request related to the review
     * @param {ReviewType} type The type of review
     * @returns {Promise<?Review>} The review or null
     */
    async getSpecificToUser(userID, requestID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let result = await this.#collection.aggregate([
                { $match: { userID: userID,
                            [`${collection}.ratings.requestID`]: requestID}},
                { $addFields: { [`${collection}.ratings.targetID`]: "$userID"}},
                { $unwind: `$${collection}.ratings` },
                { $replaceRoot: { newRoot: `$${collection}.ratings` }}
                
            ]).toArray();

            return result.length == 0 ? null : result[0];
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets all reviews to a user
     * @async
     * @param {String} userID The id of the user that has the review
     * @param {ReviewType} type The type of review
     * @returns {Promise<?[Review]>} An array of all reviews or null
     */
    async getAllToUser(userID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let result = await this.#collection.aggregate([
                { $match: { userID: userID }},
                { $addFields: { [`${collection}.ratings.targetID`]: "$userID"}},
                { $unwind: `$${collection}.ratings` },
                { $replaceRoot: { newRoot: `$${collection}.ratings` }}
            ]).toArray();

            return result.length == 0 ? null : result;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets all reviews created by a user
     * @async
     * @param {String} userID The id of the user that created the review
     * @param {ReviewType} type The type of review
     * @returns {Promise<?[Review]>} An array of all reviews or null
     */
    async getAllFromUser(userID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let result = await this.#collection.aggregate([
                { $match: { [`${collection}.ratings.creatorID`]: userID}},
                { $addFields: { [`${collection}.ratings.targetID`]: "$userID"}},
                { $unwind: `$${collection}.ratings` },
                { $replaceRoot: { newRoot: `$${collection}.ratings` }}
            ]).toArray();

            return result.length == 0 ? null : result;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Removes a specific review to a user
     * @async
     * @param {String} userID The id of the user that has the review
     * @param {String} requestID The id of the review related to the review
     * @param {ReviewType} type The type of review 
     * @returns {Promise<Boolean>} If the review was removed successfully
     */
    async removeTo(userID, requestID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let filter = 
            { 
                userID: ObjectID(userID),
                [`${collection}.ratings.requestID`]: requestID
            };
            let result = await this.#collection.deleteOne(filter);
            return result.result.ok == 1 && result.result.n == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Removes a specific review from a user
     * @async
     * @param {String} userID The id of the user that created the review
     * @param {String} requestID The id of the review related to the review
     * @param {ReviewType} type The type of review
     * @returns {Promise<Boolean>} If the review was removed successfully
     */
    async removeFrom(userID, requestID, type)
    {
        try
        {
            let collection = type == ReviewType.Requester ? "requesterCollection" : "providerCollection";
            let filter = 
            { 
                [`${collection}.ratings.creatorID`]: userID,
                [`${collection}.ratings.requestID`]: requestID
            };
            let result = await this.#collection.deleteOne(filter);
            return result.result.ok == 1 && result.result.n == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }
}
 
module.exports =
{
    DBReviewsInterface,
    ReviewType
}
 