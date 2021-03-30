/**
 * This file contains the DatabaseHandler class and related types
 */

// fetch related classes
const { MongoClient, MongoCallback } = require("mongodb");

/**
 * Class handling database connections
 * @example
 *  // Connect to database:
 *  let databaseHandler = new DatabaseHandler();
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
class DatabaseHandler
{
    #url;
    #isConnected;
    #client;

    /**
     * Creates a new mongoDB database handler
     * @constructor
     * @param {string} database The name of the database to connect to
     * @param {string} host The ip-address or host name of the host
     * @param {string} port The port used by the database
     * @param {string} url The mongoDB connection url
     */
    constructor(host = "localhost", port = "27017", url = undefined)
    {
        this.#url = url === undefined ? `mongodb://${host}:${port}` : url;
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
     * @param {MongoCallback<MongoClient>} callback Function called when result 
     * is ready
     */
    connect(callback)
    {
        if (!this.#isConnected)
        {
            //Somehow this is valid
            var thisObject = this;
            MongoClient.connect(this.#url, function(error, result)
            {
                if (!error)
                {
                    thisObject.#client = result;    //?
                    thisObject.#isConnected = true; //?
                }

                callback(error, thisObject.#client);
            });
            
        }
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
            this.#client = await MongoClient.connect(this.#url);
            this.#isConnected = true;
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
        _databaseHandler = new DatabaseHandler();
        var client = await _databaseHandler.connectAsync();

        console.log("Database Connected");

        var database = client.db("testDB");
        var collection = database.collection("test");

        var item = {
            "name"  : "itemA",
            "value" : 1
        }
        
        let dropResult = await collection.deleteMany({"name": "itemA"});
        console.log(dropResult.result);
        let insertResult = await collection.insertOne(item);
        console.log(insertResult.result);
        let document = await collection.findOne({"name": "itemA"});
        console.log(document);
    }
    catch(err)
    {
        console.log(err.message);
    }
    finally
    {
        console.log("Database Closing");
        _databaseHandler.close();
    }
}

testDatabaseAsync();