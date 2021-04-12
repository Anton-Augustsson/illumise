/**
 * This file contains the DBChatInterface class, handling all requests related 
 * to chats and messages.
 */

const { Db, ObjectID } = require("mongodb");

const chatCollectionName = "Chat";

/**
 * @typedef {Object.<string, [ChatMessage]>} MessageCollection
 */

/**
 * @typedef ChatMessage
 * @property {Number} time
 * @property {String} message
 */

/**
 * Represents the public database interface related to chat
 * @class
 */
class DBChatInterface
{
    /** @type {Db} @private */
    #database;

    ///TODO: add private collection field

    /**
     * Creates a new DBChatInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
    }

    /**
     * Adds a new chat if no equivalent chat exists
     * @async
     * @param {String} requestID The id of the related request
     * @param {[String]} userIDs A list containing the ids of all related users 
     * @returns {Promise<ObjectID|null>} The id of the chat or null
     */
    async add(requestID, userIDs)
    {
        let collection = this.#database.collection(chatCollectionName);

        let messageCollection = {};
        for (let i = 0; i < userIDs.length; i++)
        {
            messageCollection[userIDs[i]] = [];
        }

        // TODO: Handle different ordering of ids (sort first?)
        let filter =
        {
            requestID: requestID,
            messageCollection: messageCollection
        }
        let chat =
        {
            requestID: requestID,
            dateCreated: Date.now(),
            messageCollection: messageCollection
        }
        let update  = { $setOnInsert: chat };
        let options = { upsert: true };

        try
        {
            let result  = await collection.updateOne(filter, update, options);
            return result.upsertedId !== null ? result.upsertedId._id : null;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Adds a message to a chat
     * @async
     * @param {String} chatID The id of the chat
     * @param {String} userID The user id of the sender
     * @param {String} message The message sent
     * @returns {Promise<boolean>} If the message was added successfully 
     */
    async addMessage(chatID, userID, message)
    {
        let collection = this.#database.collection(chatCollectionName);
        let filter = { _id: ObjectID(chatID) };
        let update = 
        {
            $push: 
            {
                [`messageCollection.${userID}`]:
                {
                    time: Date.now(),
                    message: message
                }
            }
        }

        try
        {
            let result  = await collection.updateOne(filter, update);
            return result.result.ok == 1 && result.result.nModified == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }

    /**
     * Gets all messages in a given chat
     * @async
     * @param {String} chatID The if of the chat
     * @returns {Promise<MessageCollection>} The message collection
     */
    async getMessages(chatID)
    {
        let collection = this.#database.collection(chatCollectionName);
        let filter = { _id: ObjectID(chatID) };

        try
        {
            let result = await collection.findOne(filter);
            return result == null ? null : result.messageCollection;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Gets messages in a given chat after some specific time
     * @async
     * @param {String} chatID The id of the chat
     * @param {number} time The number of milliseconds elapsed since January 1, 1970 00:00:00 UTC (get from Date.now)
     * @returns {Promise<MessageCollection|null>} 
     */
    async getMessagesAfter(chatID, time)
    {
        let collection = this.#database.collection(chatCollectionName);
        let filter = { _id: ObjectID(chatID) };

        try
        {
            // TODO: Do this with a db query

            let result = await collection.findOne(filter);
            if (result == null) return null;

            let values  = Object.values(result.messageCollection);
            for (let a = 0; a < values.length; a++)
            {
                for (let b = 0; b < values[a].length; b++)
                {
                    if (values[a][b].time < time) values[a].splice(b, 1);
                }
            }

            return result.messageCollection;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
    
    /**
     * Get all chat messages from a specific user
     * @param {String} chatID the chat to get messages from
     * @param {String} userID the user whos messages to find
     * @returns {Promise<[ChatMessage]|null>} The message collection
     */
    async getMessagesFrom(chatID, userID)
    {
        let collection = this.#database.collection(chatCollectionName);
        let filter = { _id: ObjectID(chatID)};

        try
        {
            let result = await collection.findOne(filter); //TODO: get only the element matching userID in the query somehow

            return result === null ? null : result.messageCollection[userID];
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Removes a chat
     * @async
     * @param {String} chatID The id of the chat to remove
     * @returns {Promise<Boolean>} If the operation was successful
     */
    async remove(chatID)
    {
        let collection = this.#database.collection(chatCollectionName);
        let filter = { _id: ObjectID(chatID) };

        try
        {
            let result = await collection.deleteOne(filter);
            return result.result.ok == 1 && result.result.n == 1;
        }
        catch (error)
        {
            console.error(error);
            return false;
        }
    }
}

module.exports =
{
    DBChatInterface
}