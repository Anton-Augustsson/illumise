/**
 * This file contains the DBChatInterface class, handling all requests related 
 * to chats and messages.
 */

const { Db, ObjectID } = require("mongodb");

class DBChatInterface
{
    /** @type {Db} @private */
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

    async add()
    {

    }

    async get()
    {
        
    }

    async remove()
    {

    }
}

module.exports =
{
    DBChatInterface
}