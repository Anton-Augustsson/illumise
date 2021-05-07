require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef User
 * @property {String} _id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} password
 * @property {String} phone
 * @property {number} dateCreated
 */

/**
 * Managing user account both for service provider and service requester
 */
const account =
{
    accountUrl: url + '/account',

    /**
     * create new account
     * @param {json} credentials - A object of the users credentials.
     */
    createAccount: async function(credentials)
    {
        let url = account.accountUrl + '/createAccount';
        let toCreate = {credentials: credentials};
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
     * remove specified account
     * @param {string} userID - The user id of the account that should be deleted
     */
    removeAccount: async function(userID)
    {
        let url = account.accountUrl + '/removeAccount';
        let toRemove = {userID: userID};
        let response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toRemove)
        });

        return returnResponse(response);
    },

    /**
     * enter key word and the value to be changed. Enter multiple keys and-values will be verified if they are correct keys. Or send an object that a class defines with values.
     * @param {string} userID - The user id of the account that should be changed
     * @param {json} credentials - A object of the users credentials.
     */
    changeCredentials: async function(userID, credentials)
    {
        let url = account.accountUrl + '/changeCredentials';
        let toUpdate = {userID: userID, credentials: credentials};
        let response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(toUpdate)
        });

        return returnResponse(response);
    },

    /**
     * Gets the id of the user with the given email if the password matches
     * @async
     * @param {String} email The email of the user
     * @param {String} password The password of the user
     * @returns {?User} The id of the user
     */
    get: async function(email, password)
    {
        let params = '?email=' + email + '&password=' + password;
        let url = account.accountUrl + '/get' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * Gets the user with the given id
     * @async
     * @param {String} userID The email of the user
     * @returns {?User} The id of the user
     */
    getFromID: async function(userID)
    {
        let params = '?userID=' + userID;
        let url = account.accountUrl + '/getFromID' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },
};

export default account;
