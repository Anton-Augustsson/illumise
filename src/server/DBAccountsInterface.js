/**
 * This file contains the DBAccountsInterface class, handling all requests 
 * related users and their accounts.
 */

const { ObjectID } = require("bson");
const { Db } = require("mongodb");

/**
 * Represents the public database interface related to accounts
 * @class
 */
class DBAccountsInterface
{
    #database;

    /**
     * Creates a new DBAccountsInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
    }
    
    /**
     * Adds a new user account if no other account uses its email
     * @async
     * @param {string} firstName 
     * @param {string} lastName 
     * @param {string} email 
     * @param {string} password 
     * @returns {Promise<ObjectID>} The id of the created account or null if the
     * account was not created
     */
    async add(firstName, lastName, email, password)
    {
        let collection = this.#database.collection("Users");
        let filter = 
        {
            email: email
        };
        let user = 
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            encryptedPassword: password,
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
        let result = await collection.updateOne(filter, {$setOnInsert: user}, {upsert: true});
        return result.upsertedId !== null ? result.upsertedId._id : null;
    }

    /**
     * Removes a user account
     * @async
     * @param {string} userID 
     * @returns 
     */
    async remove(userID)
    {
        let collection = this.#database.collection("Users");
        let filter = ObjectID(userID);
        return await collection.deleteOne(filter);
    }
}
 
module.exports =
{
    DBAccountsInterface
}