/**
 * This file contains the DBChatInterface class, handling all requests related 
 * to chats and messages.
 */

const { Db, ObjectID, Collection } = require("mongodb");
const chatCollectionName = "Chat";

/**
 * @typedef Chat
 * @property {String} _id
 * @property {String} requestID
 * @property {Number} dateCreated
 * @property {UserMessages} provider
 * @property {UserMessages} requester
 */

/**
 * @typedef UserMessages
 * @property {String} _id
 * @property {[ChatMessage]} messages
 */

/**
 * @typedef ChatMessage
 * @property {Number} time
 * @property {String} text
 */

/**
 * Represents the public database interface related to chat
 * @class
 */
class DBChatInterface
{
    /** @type {Db} @private */
    #database;

    /** @type {Collection} @private */
    #collection;

    /**
     * Creates a new DBChatInterface
     * @constructor
     * @param {Db} database The database to use
     */
    constructor(database)
    {
        this.#database = database;
        this.#collection = this.#database.collection(chatCollectionName);
    }

    /**
     * Adds a new chat if no equivalent chat exists
     * @async
     * @param {String} requestID The id of the related request
     * @param {String} requesterID The id of the requester
     * @param {String} providerID The id of the provider
     * @returns {Promise<?String>} The id of the chat or null
     */
    async add(requestID, requesterID, providerID)
    {
        try
        {
            let filter =
            {
                requestID: ObjectID(requestID),
                "provider._id": ObjectID(providerID)
            }
            let chat =
            {
                requestID: ObjectID(requestID),
                dateCreated: Date.now(),
                provider: {
                    _id: ObjectID(providerID),
                    messages: []
                },
                requester: {
                    _id: ObjectID(requesterID),
                    messages: []
                }
            }
            let update  = { $setOnInsert: chat };
            let options = { upsert: true };
            let result = await this.#collection.updateOne(filter, update, options);
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
     * @param {String} message The message sent
     * @param {Boolean} isProvider If the sender is a provider (not requester)
     * @returns {Promise<Boolean>} If the message was added successfully 
     */
    async addMessage(chatID, message, isProvider)
    {
        try
        {
            let filter = { _id: ObjectID(chatID) };
            let update = 
            {
                $push: 
                {
                    [`${isProvider ? "provider" : "requester"}.messages`]:
                    {
                        time: Date.now(),
                        text: message
                    }
                }
            }
            let result  = await this.#collection.updateOne(filter, update);
            return result.result.ok == 1 && result.result.nModified == 1;
        }
        catch (error)
        {
            return false;
        }
    }

    /**
     * Adds a message to a chat
     * @async
     * @param {String} chatID The id of the chat
     * @returns {Promise<?Chat>} If the message was added successfully 
     */
    async getFromID(chatID)
    {
        try
        {
            let filter = { _id: ObjectID(chatID) };
            let result  = await this.#collection.findOne(filter);
            return result;
        }
        catch (error)
        {
            return false;
        }
    }

    /**
     * Gets all chat data of the chat with the given id
     * @async
     * @param {String} requestID The id of the request
     * @returns {Promise<?[Chat]>} The chat
     */
    async getChats(requestID, num = undefined)
    {
        try
        {
            let filter = { requestID: ObjectID(requestID) };
            let result = await this.#collection.find(filter).toArray();
            if (num !== undefined) result.length = num >= 0 ? num : 0;
            return result;
        }
        catch (error)
        {
            console.log(error);
            return null;
        }
    }

    /**
     * Gets all chat data of the chat with the given id
     * @async
     * @param {String} requestID The id of the request
     * @param {String} userID The id of the user
     * @param {Boolean} isProvider If the user is a provider
     * @returns {Promise<?Chat>} The chat
     */
    async getChat(requestID, userID, isProvider)
    {
        try
        {
            let filter = 
            { 
                requestID: ObjectID(requestID),
                [`${isProvider ? "provider" : "requester" }._id`]: ObjectID(userID)
            };
            let result = await this.#collection.findOne(filter);
            return result == null ? null : result;
        }
        catch (_)
        {
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
        try
        {
            let filter = { _id: ObjectID(chatID) };
            let result = await this.#collection.deleteOne(filter);
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
