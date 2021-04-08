/**
 * This file contains the DBChatInterface class, handling all requests related 
 * to chats and messages.
 */

const { Db, ObjectID } = require("mongodb");

const chatCollectionName    = "Chat";

/**
 * @typedef MessageCollection
 * @property {[ChatMessage]} [userID]
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
            messageCollection[userIDs[i].toString()] = new Array();
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
            console.log(error);
            return null;
        }
    }

    /**
     * Adds a message to a chat
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
                messageCollection:
                {
                    [userID]: 
                    {
                        time: Date.now(),
                        message: message
                    }
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
            console.log(error);
            return false;
        }
    }

    /**
     * Gets all messages in a given chat
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
            return result.messageCollection;
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }

    /**
     * Removes a chat
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