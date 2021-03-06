/**
 * This file contains the DBAccountsInterface class, handling all requests 
 * related users and their accounts.
 */

const { Db, ObjectID, Collection } = require("mongodb");
const accountCollectionName = "Users";

/**
 * @typedef User
 * @property {String} _id
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
     * Adds a new user account if no other account uses its email or phone
     * @async
     * @param {String} firstName The fist name of the user
     * @param {String} lastName The last name of the user
     * @param {String} email The email of the user
     * @param {String} phone The phone number of the user
     * @param {String} password The password of the user
     * @param {String} picture The picture of the user
     * @returns {Promise<ObjectID|null>} The id of the created account or null 
     */
    async add(firstName, lastName, email, phone, password, picture)
    {
        try
        {
            let filter = { email: email };
            let update  = 
            { 
                $setOnInsert: 
                {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    phone: phone,
                    password: password,
                    picture: picture,
                    dateCreated: Date.now()
                } 
            };
            let options = { upsert: true };
            let result  = await this.#collection.updateOne(filter, update, options);
            
            return result.upsertedId? result.upsertedId._id : null;
        }
        catch (error)
        {
            console.error(error);
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
     * @param {String} phone The phone number of the user
     * @param {String} password The new password
     * @param {String} picture The new picture 
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async update(userID, firstName = undefined, lastName = undefined, 
                 email = undefined, phone = undefined, password = undefined, picture = undefined)
    {
        try
        {
            let filter = { _id: ObjectID(userID) };
            let newValues = { $set: {} };
            if (firstName !== undefined) newValues.$set.firstName = firstName;
            if (lastName  !== undefined) newValues.$set.lastName  = lastName;
            if (email     !== undefined) newValues.$set.email     = email;
            if (phone     !== undefined) newValues.$set.phone     = phone;
            if (password  !== undefined) newValues.$set.password  = password;
            if (picture   !== undefined) newValues.$set.picture = picture ;
            
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
     * Gets the user with the given email if the password matches
     * @async
     * @param {String} email The email of the user
     * @param {String} password The password of the user
     * @returns {?User} The id of the user
     */
    async get(email, password)
    {
        try
        {
            let filter = 
            {
                email: email,
                password: password
            };
            let result = await this.#collection.findOne(filter);
            return result;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets the user with the given id
     * @async
     * @param {String} userID The email of the user
     * @returns {?User} The id of the user
     */
    async getFromID(userID)
    {
        try
        {
            let filter = { _id: ObjectID(userID) };
            let options = { password: 0 }
            let result = await this.#collection.findOne(filter, options);
            return result;
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
