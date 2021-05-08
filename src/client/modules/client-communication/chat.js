require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef Chat
 * @property {String} _id
 * @property {String} requestID
 * @property {Number} dateCreated
 * @property {MessageCollection} provider
 * @property {MessageCollection} requester
 */

/**
 * @typedef MessageCollection
 * @property {String} _id
 * @property {[ChatMessage]} messages
 */

/**
 * @typedef ChatMessage
 * @property {Number} time
 * @property {String} text
 */

/**
 * Managing user chat both for service provider and service requester
 */
const chat = 
{
    chatUrl: url + '/chat',

    /**
     * sends a message to a person 
     * @param {string} userID - The id of the user that sends a message
     * @param {string} chatID - The id of the chat witch is between the provider and requester
     */
    sendMessage: async function(chatID, msg, isProvider)
    {
        let url = chat.chatUrl + '/sendMessage';
        let message = {chatID: chatID, msg: msg, isProvider: isProvider};
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        });

        return returnResponse(response);
    },

    /**
     * Gets all chat data of the chat with the given id
     * @async
     * @param {String} requestID The id of the request
     * @param {String} userID The id of the user
     * @param {Boolean} isProvider If the user is a provider
     * @returns {Promise<?Chat>} The chat
     */
    getChat: async function(requestID, userID, isProvider)
    {
        let params = `?requestID=${requestID}&userID=${userID}isProvider=${isProvider}`;
        let url = chat.chatUrl + '/getChat' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * Gets all chat data of the chat with the given id
     * @async
     * @param {String} requestID The id of the request
     * @param {Number} num The number of chats
     * @returns {Promise<?Chat>} The chat
     */
    getChats: async function(requestID, num = undefined)
    {
        let params = `?requestID=${requestID}&num=${num}`;
        let url = chat.chatUrl + '/getChats' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * Gets all chat data of the chat with the given id
     * @async
     * @param {String} chatID The id of the request
     * @returns {Promise<?Chat>} The chat
     */
    getChatFromID: async function(chatID)
    {
        let params = `?requestID=${chatID}`;
        let url = chat.chatUrl + '/getChatFromID' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * Adds a new chat if no equivalent chat exists
     * @async
     * @param {String} requestID The id of the related request
     * @param {String} requesterID The id of the requester
     * @param {String} providerID The id of the provider
     * @returns {Promise<?String>} The id of the chat or null
     */
    newChat: async function(requestID, requesterID, providerID)
    {
        let url = chat.chatUrl + '/newChat';
        let toCreate = {requestID: requestID, requesterID: requesterID, providerID: providerID};
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toCreate)
        });

        return returnResponse(response);
    },

    /**
     * remove chat if no longer interested in chat
     * @param {string} chatID - The id of the chat witch is between the provider and requester
     */
    removeChat: async function(chatID) 
    {
        let url = chat.chatUrl + '/removeChat';
        let toRemove = {chatID: chatID};
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toRemove)
        });

        return returnResponse(response);
    }
};

export default chat;
