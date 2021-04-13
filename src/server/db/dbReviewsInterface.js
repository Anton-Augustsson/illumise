/**
 * This file contains the DBAccountsInterface class, handling all requests 
 * related users and their accounts.
 */

const { Db, ObjectID, Collection } = require("mongodb");
const reviewCollectionName = "Reviews";

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
     * Adds a provider review (A review for a provider meaning the requester writes it)
     * @param {String} userIDTo The id of the user the review is for
     * @param {String} userIDFrom The id of the user writing the review
     * @param {String} requestID The id of the request the review is related to
     * @param {String} message The message on the review
     * @param {Number} value The rated score 0 - 5
     * @returns {Boolean} If the review was added
     */
    async addProviderReview(userIDTo, userIDFrom, requestID, message, value)
    {
        try
        {
            let filter = { userID: userIDTo };
            let update =
            {
                $push: 
                {
                    "providerCollection.ratings":
                    {
                        value: value,
                        message: message,
                        dateCreated: Date.now(),
                        creatorID: userIDFrom,
                        requestID: requestID
                    }
                },
                $setOnInsert:
                {
                    userID: userIDTo,
                    requesterCollection:
                    {
                        averageRating: 0,
                        numRatings: 0,
                        ratings: []
                    },
                    providerCollection:
                    {
                        averageRating: 0,
                        numRatings: 0,
                        ratings: []
                    }
                }
            }
            let options = { upsert: true };
            let result = await this.#collection.updateOne(filter, update, options);
            return result.result.ok == 1 && result.result.n == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }
 
    /**
     * Adds a requester review (A review for a requester meaning the provider writes it)
     * @param {String} userIDTo The id of the user the review is for
     * @param {String} userIDFrom The id of the user writing the review
     * @param {String} requestID The id of the request the review is related to
     * @param {String} message The message on the review
     * @param {number} value The rated score 0 - 5
     * @returns {Boolean} If the review was added
     */
    async addRequesterReview(userIDTo, userIDFrom, requestID, message, value)
    {
        try
        {
            let result = await this.#collection.aggregate(
                [{$unwind: "$requesterCollection"},
                 {$match: { userID: userIDTo }},
                 {$project: { averageRating: "$requesterCollection.averageRating",
                              numRatings: "$requesterCollection.numRatings"}}
                ]).toArray();
            
            console.log(result);

            let update =
            {
                $push: 
                {
                    "requesterCollection.ratings":
                    {
                        value: value,
                        message: message,
                        dateCreated: Date.now(),
                        creatorID: userIDFrom,
                        requestID: requestID
                    }
                },
                $setOnInsert:
                {
                    userID: userIDTo,
                    requesterCollection:
                    {
                        averageRating: 0,
                        numRatings: 0,
                        ratings: []
                    },
                    providerCollection:
                    {
                        averageRating: 0,
                        numRatings: 0,
                        ratings: []
                    }
                }
            }
            let options = { upsert: true };
            //let result = await this.#collection.updateOne(filter, update, options);
            //return result.result.ok == 1 && result.result.n == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * @param {String} ratingID The id of the rating to update
     * @param {Number} rating The newly added rating (0 - 5)
     * @param {String} collection "$customerCollection" or  "$providerCollection"
     */
    async updateCustomerAverageRating(ratingID, rating, collection)
    {
        let filter = 
        {
            _id: ObjectID(ratingID)
        }

        let action = 
        {
            $expr: 
            {
                $function:
                {
                    body: function(col)
                    {
                        col.averageRating = (col.averageRating * col.numRatings + rating) / (col.numRatings + 1);
                        col.numRatings++;
                        return col.averageRating;
                    },
                    args: [collection],
                    lang: "js"
                }
            }
        }

        this.#collection.aggregate()
    }

    async getUserProviderRating()
    {
        
    }

    async getUserRequesterRating()
    {

    }

    async getUserProviderReviews()
    {

    }

    async getUserRequesterReviews()
    {
        
    }
}
 
module.exports =
{
    DBReviewsInterface
}
 