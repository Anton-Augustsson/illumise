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
     * sends a message to a person 
     * @param {string} userID - The id of the user that sends a message
     * @param {string} chatID - The id of the chat witch is between the provider and requester
     */
    sendMessage: async function(userID, chatID, msg)
    {
        let url = chat.chatUrl + '/sendMessage';
        let message = {userID: userID, chatID: chatID, msg: msg};
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
     * get all messages from a specific chat
     * @param {string} userID - The id of the user that sends a message
     * @param {string} chatID - The id of the chat witch is between the provider and requester
     */
    getAllMessages: async function(userID, chatID)
    {
        let params = '?userID=' + userID + '&chatID=' + chatID;
        let url = chat.chatUrl + '/getAllMessages' + params;        
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * setup a new chat for a new service provider
     * @param {string} requestID - The id of the request that is the chat should be created for
     * @param {[string]} usersID - The an array of two users
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
