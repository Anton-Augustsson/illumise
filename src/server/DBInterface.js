
const { DBConnectionHandler } = require("./DBConnectionHandler");
const dbName = "Main";

class DBInterface
{
    #connection;
    #database;

    /**
     * 
     * @param {string} host 
     * @param {string} port 
     * @param {string} url 
     */
    constructor(host = "localhost", port = "27017", url = undefined)
    {
        this.#connection = new DBConnectionHandler(host, port, url);
        this.#connection.connectAsync();
        this.#database = this.#connection.client.db(dbName);
    }

    /**
     * Create a new service request
     * @param {string} userID 
     * @param {string} type 
     * @param {*} data
     */
    newRequest(userID, type, data)
    {

    }

    /*

        Database structure:
        
        Requests
        { //Request
            "_id": 
            {
                "$oid"
            },
            dateCreated,
            dateCompleted,
            geoLocation,
            header,
            body,
            cost,
            isFulfilled,
            creatorID,
            takerID
        }

        Users
        { //User
            "_id": 
            {
                "$oid"
            },
            firstName,
            lastName,
            email,
            encryptedPassword,
            ratingsID,
            dateCreated
        }

        Ratings
        { //Rating
            customerCollection,
            providerCollection
        }

        CustomerCollections / ProviderCollection
        {
            averageRating, //(0 - 5)
            numRatings,
            ratings:
            {
                ...
            }
        }

        Rating
        {
            value,
            message,
            serviceID,
            creatorID,
            dateCreated
        }
    */


    /**
     * 
     * @param {string} userID
     * @param {number} num
     * @returns {[*]}
     *  
     */
    getMyRequests(userID, num)
    {
        let collection = this.#database.collection("Requests");
    }

    getNearRequests(geoLocation)
    {
        
    }

    /**
     * 
     */
    finnishRequest(requestID)
    {

    }

    removeRequest()
    {

    }
}