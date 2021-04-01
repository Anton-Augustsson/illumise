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
    #url;
    #isConnected;
    #client;

    /**
     * Creates a new DBConnectionHandler
     * @constructor
     * @param {string} url The mongoDB connection url
     */
    constructor(url)
    {
        this.#url = url;
        this.#isConnected = false;
        this.#client = null;
    }

    /**
     * Checks if the database is currently connected
     * @returns {boolean} If currently connected
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
     * @returns {Promise<MongoClient>} The database client
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
     */
    close()
    {
        if (this.#isConnected)
        {
            this.#client.close();
            this.#client = null;
            this.#isConnected = false;
        }
    }
}

/**
 * Function used to test database
 */
async function testDatabaseAsync()
{
    var _databaseHandler;
    try
    {
        _databaseHandler = new DBConnectionHandler();
        var client = await _databaseHandler.connectAsync();

        console.log("Database Connected");

        var database = client.db("testDB");
        var collection = database.collection("test");

        var item = 
        {
            "name"  : "itemA",
            "value" : 1
        };
        
        let dropResult = await collection.deleteMany({"name": "itemA"});
        console.log(dropResult.result);
        let insertResult = await collection.insertOne(item);
        console.log(insertResult.result);
        let document = await collection.findOne({"name": "itemA"});
        console.log(document);
    }
    catch(err)
    {
        console.error(err);
    }
    finally
    {
        console.log("Database Closing");
        _databaseHandler.close();
    }
}

module.exports =
{
    DBConnectionHandler
}