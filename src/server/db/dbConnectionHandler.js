/**
 * This file contains the DBConnectionHandler class and related types
 */

// fetch related classes
const { MongoClient } = require("mongodb");

/**
 * Represents a database connection handler
 * @class
 * @example
 *  // Connect to database:
 *  let databaseHandler = new DBConnectionHandler();
 *  let client = await databaseHandler.connectAsync();
 *  let database = client.db("testDB");
 *  let collection = database.collection("test");
 *  ...
 * 
 *  // Always close when done
 *  databaseHandler.close(); 

 *  // Insert into database:
 *  let item = {"name": "test", ...};
 *  let result = await collection.insertOne(item);
 *  ...
 * 
 *  // Remove from database:
 *  let filter = {"name": "test"};
 *  let result = await collection.deleteMany(filter);
 *  ...
 * 
 *  // Fetch element from database:
 *  let filter = {"name": "test"};
 *  let result = await collection.findOne(filter);
 *  ...
 */
class DBConnectionHandler
{
    /** @type {String} @private*/
    #url;
    /** @type {Boolean} @private*/
    #isConnected;
    /** @type {MongoClient} @private*/
    #client;

    /**
     * Creates a new DBConnectionHandler
     * @constructor
     * @param {String} url The mongoDB connection url
     */
    constructor(url)
    {
        this.#url = url;
        this.#isConnected = false;
        this.#client = null;
    }

    /**
     * Checks if the database is currently connected
     * @returns {Boolean} If currently connected
     */
    get isConnected()
    {
        return this.#isConnected;
    }

    /**
     * Fetches the current client
     * @returns {MongoClient|null} The current client or null
     */
    get client()
    {
        return this.#client;
    }

    /**
     * Establishes a database connection
     * @async
     * @returns {Promise<MongoClient>|null} The database client or null
     */
    async connectAsync()
    {
        if (!this.#isConnected)
        {
            try
            {
                this.#client = await MongoClient.connect(this.#url);
                this.#isConnected = true;
            }
            catch (error)
            {
                this.#client = null;
                this.#isConnected = false;
                console.error(error);
                return null;
            }
        }
        return this.#client;
    }

    /**
     * Closes the database connection
     * @returns {Promise<void>}
     */
    async close()
    {
        if (this.#isConnected)
        {
            await this.#client.close();
            this.#client = null;
            this.#isConnected = false;
        }
    }
}

module.exports =
{
    DBConnectionHandler
}