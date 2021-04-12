/**
 * This file contains the DBAccountsInterface class, handling all requests 
 * related users and their accounts.
 */

const { Db, ObjectID, Collection } = require("mongodb");
const accountCollectionName = "Users";

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
class DBAccountsInterface
{
    /** @type {Db} @private */
    #database;
    /** @type {Collection} @private */
    #collection;

    ///TODO: add private collection field

    /**
     * Creates a new DBAccountsInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database   = database;
        this.#collection = this.#database.collection(accountCollectionName);
    }
    
    /**
     * Adds a new user account if no other account uses its email
     * @async
     * @param {String} firstName The fist name of the user
     * @param {String} lastName The last name of the user
     * @param {String} email The email of the user
     * @param {String} password The password of the user
     * @returns {Promise<ObjectID|null>} The id of the created account or null 
     */
    async add(firstName, lastName, email, password)
    {
        let filter = { email: email };
        let user = 
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            dateCreated: Date.now(),
            ratings:
            {
                customer: 
                {
                    averageRating: 0,
                    ratings: {}
                },
                provider: 
                {
                    averageRating: 0,
                    ratings: {}
                }
            },
            requestIDs: {},
            providingIDs: {}
        };
        let update  = { $setOnInsert: user };
        let options = { upsert: true };
        
        try
        {
            let result  = await this.#collection.updateOne(filter, update, options);
            return result.upsertedId !== null ? result.upsertedId._id : null;
        }
        catch (error)
        {
            console.log(error);
            return null;
        }
    }

    /**
     * Updates properties of a user
     * @async
     * @param {String} userID The id of the user to update
     * @param {String} firstName The new first name
     * @param {String} lastName The new last name
     * @param {String} email The new email
     * @param {String} password The new password
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async update(userID, firstName = undefined, lastName = undefined, 
                 email = undefined, password = undefined)
    {
        let newValues = { $set: {} };
        if (firstName !== undefined) newValues.$set.firstName = firstName;
        if (lastName  !== undefined) newValues.$set.lastName  = lastName;
        if (email     !== undefined) newValues.$set.email     = email;
        if (password  !== undefined) newValues.$set.password  = password;

        try
        {
            let filter = { _id: ObjectID(userID) };
            let result = await this.#collection.updateOne(filter, newValues);
            return result.result.ok == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Gets the id of the user with the given email if the password matches
     * @async
     * @param {String} email The email of the user
     * @param {String} password The password of the user
     * @returns {String|null} The id of the user
     */
    async get(email, password)
    {
        let filter = 
        {
            email: email,
            password: password
        }

        try
        {
            let result = await this.#collection.findOne(filter);
            return result._id;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Removes a user account
     * @async
     * @param {String} userID The id of the user to remove
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async remove(userID)
    {
        try
        {
            let filter = { _id: ObjectID(userID) };
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
    DBAccountsInterface
}
