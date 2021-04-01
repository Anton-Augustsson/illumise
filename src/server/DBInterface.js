/**
 * This file contains the DBInterface class handles all external interaction
 * with the database
 */

const { DBConnectionHandler } = require("./DBConnectionHandler");
const { DBRequestsInterface } = require("./DBRequestsInterface");
const { DBAccountsInterface } = require("./DBAccountsInterface");

const dbName = "testDB";

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
        encryptedPassword, //TEMP
        dateCreated,
        ratingsID,
        requestIDs,     // support multiple?
        providingIDs    // support multiple?
    }

    Ratings
    { //Rating
        customerCollection,
        providerCollection
    }

    CustomerCollections / ProviderCollection
    {
        averageRating, //(0 - 5)
        ratings:
        {
            ...
        }
    }

    Rating
    {
        value,
        message,
        dateCreated,
        requestID
    }
*/

/**
 * Represents the public interface of a database
 * @public
 * @class
 */
class DBInterface
{
    #connection;
    #database;
    // Inner interfaces
    #requests;
    #accounts;

    /**
     * Creates a DBInterface
     * @constructor
     * @param {string} host The ip-address or host name of the host
     * @param {string} port The port used by the database
     * @param {string} url The mongoDB connection url
     */
    constructor(host = "localhost", port = "27017", url = undefined)
    {
        url = url === undefined ? `mongodb://${host}:${port}` : url;
        this.#connection = new DBConnectionHandler(url);
    }

    /**
     * Gets the interface responsible for handling requests
     * @type {DBRequestsInterface}
     */
    get requests()
    {
        return this.#requests;
    }

    /**
     * Gets the interface responsible for handling accounts
     * @type {DBAccountsInterface}
     */
     get accounts()
     {
        return this.#accounts;
     }

    /**
     * Establishes a database connection
     * @returns {Promise<boolean>} If connection was successful
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
}

module.exports =
{
    DBInterface
}

async function testDBInterface()
{
    var db = new DBInterface();
    try
    {
        if (await db.connect())
        {
            let result = await db.accounts.add("test", "test", "test@testmail.test", "***");
            console.log("Add account: " + result);
        }
    }
    catch (error)
    {
        console.error(error);
    }
    finally
    {
        db.close();
    }
}

testDBInterface();