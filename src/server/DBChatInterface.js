/**
 * This file contains the DBChatInterface class, handling all requests related 
 * to chats and messages.
 */

const 
{ 
    Db, 
} = require("mongodb");

class DBChatInterface
{
    #database;

    /**
     * Creates a new DBChatInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
    }

    // TODO: Implement
}

module.exports
{
    DBChatInterface
}