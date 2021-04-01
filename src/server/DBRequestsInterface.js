/**
 * This file contains the DBRequestInterface class, handling all requests
 * related to requests.
 */

const { ObjectID } = require("bson");
const 
{ 
    Db, 
    InsertOneWriteOpResult,
    FindAndModifyWriteOpResultObject,
    DeleteWriteOpResultObject
} = require("mongodb");

/**
 * Represents the public database interface related to requests
 * @class
 */
class DBRequestsInterface
{
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
     * @param {string} userID The id of the user
     * @param {string} header The header of the request
     * @param {string} body The body of the request
     * @param {number} cost TODO
     * @returns {Promise<InsertOneWriteOpResult<*>>}
     */
    async add(userID, header, body, cost = undefined)
    {
        let collection = this.#database.collection("Requests");
        let request = 
        {
            dateCreated: Date.getDate(),
            dateCompleted: undefined,
            geoLocation: undefined,
            header: header,
            body: body,
            cost: cost,
            isFulfilled: false,
            creatorID: userID,
            takerID: undefined
        };
        return await collection.insertOne(request);
    }
 
    /**
     * Gets a number of requests from a user
     * @async
     * @param {string} userID The id of the user
     * @param {number} num The number of requests to fetch
     * @returns {Promise<[*]>} The requests BSON objects in a list
     */
    async getNum(userID, num)
    {
        return new Promise(() =>
        {
            let collection = this.#database.collection(Requests);
            let result = collection.find({userID: userID});
            let array = result.toArray();
            array.length = num;
            return array;
        });
    }
    
    async getNumNearby(geoLocation, num)
    {
        
    }
 
    /**
     * Marks a requests as fulfilled and sets the completed time
     * @async
     * @param {string} requestID The id of the request
     * @returns {Promise<FindAndModifyWriteOpResultObject<*>>}
     */
    async setCompleted(requestID)
    {
        let collection = this.#database.collection("Requests");
        let filter = ObjectID(requestID);
        let update = 
        {
            dateCompleted: Date.now(),
            isFulFilled: true
        };
        return await collection.findOneAndUpdate(filter, update);
    }

    /**
     * Sets the provider of a request
     * @async
     * @param {string} requestID 
     * @param {string} providerID 
     * @returns {Promise<FindAndModifyWriteOpResultObject<*>>}
     */
    async setProvider(requestID, providerID)
    {
        let collection = this.#database.collection("Requests");
        let filter = ObjectID(requestID);
        let update = 
        {
            takerID: providerID
        };
        return await collection.findOneAndUpdate(filter, update);
    }

    /**
     * Removes a request
     * @async
     * @param {string} requestID The if of the request
     * @returns {Promise<DeleteWriteOpResultObject>}
     */
    async remove(requestID)
    {
        let collection = this.#database.collection("Requests");
        let filter = ObjectID(requestID);
        return await collection.deleteOne(filter);
    }
}

module.exports =
{
    DBRequestsInterface
}