/**
 * This file contains the DBInterface class handles all external interaction
 * with the database
 */

const { Db } = require("mongodb");
const { DBConnectionHandler } = require("./dbConnectionHandler");
const { DBRequestsInterface } = require("./dbRequestsInterface");
const { DBAccountsInterface } = require("./dbAccountsInterface");
const { DBChatInterface }     = require("./dbChatInterface");

const dbName = "testDB";

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
        phone,  //TODO
        dateCreated
    }

    Ratings
    {
        "_id": { "$oid" },
        userID,
        customerCollection,
        providerCollection
    }

    CustomerCollections / ProviderCollection
    {
        "_id": { "$oid" },
        averageRating, //(0 - 5)
        numRatings,
        ratings:
        {
            ...
        }
    }

    Rating
    {
        value, //(0 - 5)
        message,
        dateCreated,
        requestID
    }

    Chat
    {
        "_id": { "$oid" },
        requestID,
        dateCreated,
        messageCollections: // 2 st
        {
            ...
        }
    }

    MessageCollection
    {
        "_id": { "$oid" },
        userID,
        messages: 
        {
            time,
            message
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

    /**
     * Creates a DBInterface
     * @constructor
     * @param {String} host The ip-address or host name of the host
     * @param {String} port The port used by the database
     * @param {String} url The mongoDB connection url
     */
    constructor(host = "localhost", port = "27017", url = undefined)
    {
        url = url === undefined ? `mongodb://${host}:${port}` : url;
        this.#connection = new DBConnectionHandler(url);
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
     * Establishes a database connection
     * @returns {Promise<Boolean>} If connection was successful
     */
    async connect()
    {
        let client = await this.#connection.connectAsync()
        if (client !== null)
        {
            this.#database = client.db(dbName);
            this.#requests = new DBRequestsInterface(this.#database);
            this.#accounts = new DBAccountsInterface(this.#database);
            return true;
        }
        return false;
    }

    /**
     * Closes the database connection
     */
    close()
    {
        this.#connection.close();
        this.#database = null;
        this.#requests = null;
    }

    /**
     * Clears the database
     */
    async clear()
    {
        if (this.#database !== null)
        {
            return await this.#database.dropDatabase();
        }
    }
}

module.exports =
{
    DBInterface
}

/**
 * Test function
 * @returns {Promise<Boolean>} If all tests passed without errors
 */
async function testDBInterface()
{
    var db = new DBInterface();
    var finalResult = true;
    try
    {
        if (!await db.connect()) return false;

        await db.clear();

        let userID = await db.accounts.add("Test", "Test", "test@testmail.test", "***");
        console.log("Added Account: " + userID);
        if (userID === null) return false;

        let user2ID = await db.accounts.add("Test2", "Test2", "test2@testmail.test", "***");
        console.log("Added Account: " + user2ID);
        if (user2ID === null) return false;

        let result = await db.accounts.update(userID, lastName = "Testing");
        console.log("Update Account Success: " + result);

        let requestID = await db.requests.add(userID, "Test", "this is a test request");
        console.log("Added Request: " + requestID);
        if (requestID === null) return false;

        result = await db.requests.setProvider(requestID, user2ID);
        console.log("Set Provider Success: " + result);
        finalResult = finalResult && result;
        
        let requests = await db.requests.getUserRequests(userID);
        console.log(requests);

        result = await db.requests.setCompleted(requestID);
        console.log("Set Completed Success: " + result);
        finalResult = finalResult && result;

        result = await db.accounts.remove(user2ID);
        console.log("Remove Account Success: " + result);
        finalResult = finalResult && result;

        result = await db.requests.remove(requestID);
        console.log("Remove Request Success: " + result);
        finalResult = finalResult && result;

        return finalResult;
    }
    catch (error)
    {
        console.error(error);
        return false;
    }
    finally
    {
        db.close();
    }
}

testDBInterface();