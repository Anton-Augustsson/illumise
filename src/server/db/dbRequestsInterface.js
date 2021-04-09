/**
 * This file contains the DBRequestInterface class, handling all requests
 * related to requests.
 */

const { Db, ObjectID } = require("mongodb");

/**
 * Represents the public database interface related to requests
 * @class
 */
class DBRequestsInterface
{
    /** @type {Db} @private */
    #database;

    /**
     * Creates a new DBRequestInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
    }

    /**
     * Create a new service request
     * @async
     * @param {String} userID The id of the user
     * @param {String} header The header of the request
     * @param {String} body The body of the request
     * @param {Number} cost TODO
     * @returns {Promise<ObjectID|null>} The id of the created request or null
     */
    async add(userID, header, body, cost = undefined)
    {
        let collection = this.#database.collection("Requests");
        let request = 
        {
            dateCreated: Date.now(),
            dateCompleted: undefined,
            geoLocation: undefined,
            header: header,
            body: body,
            cost: cost,
            isFulfilled: false,
            creatorID: userID,
            providerID: undefined
        };
        try
        {
            let result = await collection.insertOne(request);
            return result.insertedId;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
 
    /**
     * Gets requests created by a user
     * @async
     * @param {String} userID The id of the user
     * @param {Number} num The number of requests to get, if not set all will be returned
     * @returns {Promise<[*]>|null} The requests BSON objects in a list or null
     */
    async getUserRequests(userID, num = undefined)
    {
        //TODO: Wrap return values in custom class
        let collection = this.#database.collection("Requests");
        let filter = { creatorID: userID };
        try
        {
            let result = collection.find(filter);
            let array  = await result.toArray();
            if (num !== undefined) array.length = num;
            return array;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets requests that the user is set as a provider for
     * @param {String} userID The id of the user
     * @param {Number} num The number of requests to get, if not set all will be returned
     * @returns {Promise<[*]>|null} The requests BSON objects in a list or null
     */
    async getUserProviding(userID, num = undefined)
    {
        //TODO: Wrap return values in custom class
        let collection = this.#database.collection("Requests");
        let filter = { providerID: userID };
        try
        {
            let result = collection.find(filter);
            let array  = await result.toArray();
            if (num !== undefined) array.length = num;
            return array;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
    
    async getNearby(geoLocation, distance, num)
    {
        
    }
 
    /**
     * Marks a requests as fulfilled and sets the completed time
     * @async
     * @param {String} requestID The id of the request
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async setCompleted(requestID)
    {
        let collection = this.#database.collection("Requests");
        let filter = { _id: ObjectID(requestID) };
        let update = 
        {
            $set: 
            {
                dateCompleted: Date.now(),
                isFulFilled: true
            }
        };
        
        try
        {
            let result = await collection.updateOne(filter, update);
            return result.result.ok == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Sets the provider of a request
     * @async
     * @param {String} requestID The id of the request to modify
     * @param {String} providerID The id of the provider
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async setProvider(requestID, providerID)
    {
        let collection = this.#database.collection("Requests");
        let filter = { _id: ObjectID(requestID) };
        let update = { $set: {providerID: providerID} };

        try
        {
            let result = await collection.updateOne(filter, update);
            return result.result.ok == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Removes a request
     * @async
     * @param {String} requestID The if of the request
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async remove(requestID)
    {
        let collection = this.#database.collection("Requests");
        let filter = { _id: ObjectID(requestID) };

        try
        {
            let result = await collection.deleteOne(filter);
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
    DBRequestsInterface
}