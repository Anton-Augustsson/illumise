/**
 * This file contains the DBRequestInterface class, handling all requests
 * related to requests.
 */

/**
 * @typedef GeoLocation
 * @property {String} type
 * @property {[Coordinate]} coordinates 
 */

/**
 * @typedef Coordinate
 * @property {[longitude:Number, latitude:Number]} coordinates longitude, latitude 
 */


const { Db, Collection, ObjectID } = require("mongodb");

const requestCollectionName = "Requests";

/**
 * @typedef Request
 * @property {number} dateCreated
 * @property {number} dateCompleted
 * @property {GeoLocation} geoLocation
 * @property {String} header
 * @property {String} body
 * @property {Number} const
 * @property {Boolean} isFulFilled
 * @property {String} creatorID
 * @property {String} providerID
 */

/**
 * Represents the public database interface related to requests
 * @class
 */
class DBRequestsInterface
{
    /** @type {Db} @private */
    #database;

    /** @type {Collection} @private */
    #collection;
    
    /**
     * Creates a new DBRequestInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
        this.#collection = this.#database.collection(requestCollectionName);
    }

    /**
     * Create a new service request
     * @async
     * @param {String} userID The id of the user
     * @param {String} header The header of the request
     * @param {String} body The body of the request
     * @param {GeoLocation} geoLocation The location of the request
     * @param {Number} cost The cost of the request
     * @returns {Promise<?String>} The id of the created request or null
     */
    async add(userID, header, body, geoLocation = undefined, cost = undefined)
    {
        try
        {
            let request = 
            {
                dateCreated: Date.now(),
                dateCompleted: undefined,
                geoLocation: geoLocation,
                header: header,
                body: body,
                cost: cost,
                isFulfilled: false,
                creatorID: ObjectID(userID),
                providerID: undefined
            };
            let result = await this.#collection.insertOne(request);
            return result.insertedId;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets the request with the given id
     * @async
     * @param {String} requestID The id of the request
     * @returns {Promise<?Request>} The requests BSON objects in a list or null
     */
    async get(requestID)
    {
        try
        {
            let filter = { _id: ObjectID(requestID) };
            let result = await this.#collection.findOne(filter);
            return result;
        }
        catch (_)
        {
            return null;
        }
    }

    /**
     * Gets requests created by a user
     * @async
     * @param {String} userID The id of the user
     * @param {Number} num The number of requests to get, if not set all will be returned
     * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
     */
    async getUserRequests(userID, num = undefined)
    {
        try
        {
            let filter = { creatorID: ObjectID(userID) };
            let result = await this.#collection.find(filter).toArray();
            if (num !== undefined) result.length = num >= 0 ? num : 0;
            return result;
        }
        catch (_)
        {
            //console.error(error);
            return null;
        }
    }

    /**
     * Gets requests that the user is set as a provider for
     * @async
     * @param {String} userID The id of the user
     * @param {Number} num The number of requests to get, if not set all will be returned
     * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
     */
    async getUserProviding(userID, num = undefined)
    {
        try
        {
            let filter = { providerID: ObjectID(userID) };
            let result = await this.#collection.find(filter).toArray();
            if (num !== undefined) result.length = num >= 0 ? num : 0;
            return result;
        }
        catch (_)
        {
            //console.error(error);
            return null;
        }
    }

    /**
     * Get nearby requests
     * @async
     * @param {GeoLocation} geoLocation The location to search around
     * @param {Number} maxDistance The maximum distance in meters to search from geoLocation
     * @param {Number} num The number of nearby requests to retrieve
     * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
     */
     async getNearby(geoLocation, maxDistance, num = undefined)
     {
        try
        {
            await this.#collection.createIndex( { geoLocation: "2dsphere"} );
            let filter = 
            {
                geoLocation: {
                    $near: {
                        $geometry: geoLocation,
                        $maxDistance: maxDistance + 10, //10 meter margin
                        $minDistance: 0
                    }
                }
            }
            let result = await this.#collection.find(filter).toArray();
            if (num != undefined) result.length = num >= 0 ? num : 0;
            return result;
        }
        catch (_)
        {
            return null;
        }
     }

    /**
     * Marks a requests as fulfilled and sets the completed time
     * @async
     * @param {String} requestID The id of the request
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async setCompleted(requestID)
    {
        try
        {
            let filter = { _id: ObjectID(requestID) };
            let update = 
            {
                $set: 
                {
                    dateCompleted: Date.now(),
                    isFulfilled: true
                }
            };
            let result = await this.#collection.updateOne(filter, update);
            return result.result.ok == 1 && result.result.nModified == 1;
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
        try
        {
            let filter = { _id: ObjectID(requestID) };
            let update = { $set: { providerID: providerID? ObjectID(providerID) : null } };
            let result = await this.#collection.updateOne(filter, update);
            return result.result.ok == 1 && result.result.nModified == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Sets the cost of a request
     * @async
     * @param {String} requestID The id of the request
     * @param {Promise<Boolean>} value The new cost value
     */
    async setCost(requestID, value)
    {
        try
        {
            let filter = { _id: ObjectID(requestID) };
            let update = { $set: { cost: value } };
            let result = await this.#collection.updateOne(filter, update);
            return result.result.ok == 1 && result.result.nModified == 1;
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
        try
        {
            let filter = { _id: ObjectID(requestID) };
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
    DBRequestsInterface
}
