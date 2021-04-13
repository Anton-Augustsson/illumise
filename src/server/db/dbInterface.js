/**
 * This file contains the DBInterface class handles all external interaction
 * with the database
 */

const { Db } = require("mongodb");
const { DBConnectionHandler } = require("./dbConnectionHandler");
const { DBRequestsInterface } = require("./dbRequestsInterface");
const { DBAccountsInterface } = require("./dbAccountsInterface");
const { DBChatInterface }     = require("./dbChatInterface");
const { DBReviewsInterface }  = require("./dbReviewsInterface");

const testDBName = "testDB";
const dbName = "Main";

/*
    Database structure:
    
    Requests
    {
        "_id": { "$oid" },
        dateCreated,
        dateCompleted,
        geoLocation,
        header,
        body,
        cost,
        isFulfilled,
        creatorID,
        providerID
    }

    Users
    {
        "_id": { "$oid" },
        firstName,
        lastName,
        email,
        password,
        phone,
        dateCreated
    }

    Ratings
    {
        "_id": { "$oid" },
        userID,
        requesterCollection,
        providerCollection
    }

    RequesterCollection / ProviderCollection
    {
        averageRating, //(0 - 5)
        numRatings,
        ratings:
        [
            ...
        ]
    }

    Rating
    {
        value, //(0 - 5)
        message,
        dateCreated,
        creatorID,
        requestID
    }

    Chat
    {
        "_id": { "$oid" },
        requestID,
        dateCreated,
        messageCollection:
        {
            userID:
            [
                {
                    time,
                    message
                }
            ]
        }
    }
*/

/**
 * Represents the public interface of a database
 * @public
 * @class
 */
class DBInterface
{
    /** @type {DBConnectionHandler} @private */
    #connection;
    /** @type {Db} @private */
    #database;

    // Inner interfaces
    /** @type {DBRequestsInterface} @private */
    #requests;
    /** @type {DBAccountsInterface} @private */
    #accounts;
    /** @type {DBChatInterface} @private */
    #chat;
    /** @type {DBReviewsInterface} */
    #reviews;
    /** @type {boolean} @private */
    #isTesting;

    /**
     * Creates a DBInterface
     * @constructor
     * @param {String} host The ip-address or host name of the host
     * @param {String} port The port used by the database
     * @param {String} url The mongoDB connection url
     * @param {Boolean} isTesting If this will be used for testing
     */
    constructor(host = "localhost", port = "27017", url = undefined, isTesting = false)
    {
        url = url === undefined ? `mongodb://${host}:${port}` : url;
        console.log("Connecting To: " + url);
        this.#connection = new DBConnectionHandler(url);
        this.#isTesting  = isTesting;
    }

    /**
     * The interface responsible for handling requests
     * @type {DBRequestsInterface}
     */
    get requests()
    {
        return this.#requests;
    }

    /**
     * The interface responsible for handling accounts
     * @type {DBAccountsInterface}
     */
    get accounts()
    {
        return this.#accounts;
    }

    /**
     * The interface responsible for handling chat
     * @type {DBChatInterface}
     */
    get chat()
    {
        return this.#chat;
    }

    /**
     * The interface responsible for handling reviews
     * @type {DBReviewsInterface}
     */
    get reviews()
    {
        return this.#reviews;
    }

    /**
     * Establishes a database connection
     * @returns {Promise<Boolean>} If connection was successful
     */
    async connect()
    {
        let client = await this.#connection.connectAsync()
        if (client !== null)
        {
            this.#database = client.db(this.#isTesting ? testDBName : dbName);
            this.#requests = new DBRequestsInterface(this.#database);
            this.#accounts = new DBAccountsInterface(this.#database);
            this.#chat     = new DBChatInterface(this.#database);
            this.#reviews  = new DBReviewsInterface(this.#database);
            return true;
        }
        return false;
    }

    /**
     * Closes the database connection
     * @returns {Promise<void>}
     */
    async close()
    {
        this.#database = null;
        this.#requests = null;
        this.#accounts = null;
        this.#chat     = null;
        this.#reviews  = null;
        await this.#connection.close();
    }

    /**
     * Clears the database, does nothing if not in testing mode
     * @async
     * @returns {Promise<void>}
     */
    async clear()
    {
        if (this.#database !== null && isTesting)
        {
            await this.#database.dropDatabase();
        }
    }
}

module.exports =
{
    DBInterface
}