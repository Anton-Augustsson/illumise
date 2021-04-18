require('isomorphic-fetch');

/**
 * Managing user chat both for service provider and service requester
 */
const chat = 
{
    chatUrl: 'http://localhost:3000/chat',

    /**
     * sends a message to a person 
     * @param {string} userID - The id of the user that sends a message
     * @param {string} chatID - The id of the chat witch is between the provider and requester
     */
    sendMessage: async function(userID, chatID)
    {
        let url = chat.chatUrl + '/sendMessage';
        let message = {userID: userID, chatID: chatID};
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(message)
        });

        let result = await response.text() //should be json
        console.log(result);
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

        let result = await response.text(); //should be json
        console.log(result);
    },

    /**
     * setup a new chat for a new service provider
     * @param {string} requestID - The id of the request that is the chat should be created for
     */
    newChat: async function(requestID)
    {
        let url = chat.chatUrl + '/newChat';
        let toCreate = {requestID: requestID};
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toCreate)
        });

        let result = await response.text(); //should be json
        console.log(result);
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

        let result = await response.text() //should be json
        console.log(result);
    }

};

export default chat;