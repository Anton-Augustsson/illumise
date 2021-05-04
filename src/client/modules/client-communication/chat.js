/**
 * This file contains the client communication: chat functions which handles all external interaction
 * with the rest api
 */

require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * Managing user chat both for service provider and service requester
 */
const chat = 
{
    chatUrl: url + '/chat',

    /**
     * sends message to chat
     * @async
     * @param {string} userID - The id of the user that sends a message
     * @param {string} chatID - The id of the chat the user wants to send a message to
     * @param {string} msg - The message the current user wants to send
     * @returns {Promise<Boolean>} If the message was added successfully to chat
     */
    sendMessage: async function(chatID, userID, msg)
    {
        let url = chat.chatUrl + '/sendMessage';
        let message = {chatID: chatID, userID: userID, msg: msg};
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
     * get all messages from a chat
     * @async
     * @param {string} chatID - The id of the chat
     * @returns {Promise<?MessageCollection>} The message collection
     */
    getAllMessages: async function(chatID)
    {
        let params = '?chatID=' + chatID;
        let url = chat.chatUrl + '/getAllMessages' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * setup a new chat between users
     * @async
     * @param {string} requestID - The id of the request that is the chat should be created for
     * @param {[string]} usersID - The an array of two users
     * @returns {Promise<?String>} The id of the chat or null
     */
    newChat: async function(requestID, usersID)
    {
        let url = chat.chatUrl + '/newChat';
        let toCreate = {requestID: requestID, usersID: usersID};
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
     * removes chat
     * @async
     * @param {string} chatID - The id of the chat to be removed
     * @returns {Promise<Boolean>} If the operation was successful
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
