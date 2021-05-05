/**
 * This file contains the client communication: account functions which handles all external interaction
 * with the rest api
 */

require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef credentials
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} phone
 * @property {String} password
 */

/**
 * Managing user account both for service provider and service requester
 */
const account =
{
    accountUrl: url + '/account',

    /**
     * create new user account
     * @async
     * @param {credentials} - An object of the users credentials.
     * @returns {Promise<ObjectID|null>} The id of the created account or null 
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
     * remove specified user account
     * @async
     * @param {string} userID - The user id of the account that should be deleted
     * @returns {Promise<Boolean>} If the operation was successful
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
     * @async
     * @param {string} userID - The user id of the account that should be changed
     * @param {credentials} credentials - An object of the users credentials.
     * @returns {Promise<Boolean>} If the operation was successful
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
     * @param {String} email - The email of the user
     * @param {String} password - The password of the user
     * @returns {?User} The id of the user
     */
    get: async function(email, password)
    {
        let params = '?email=' + email + '&password=' + password;
        let url = account.accountUrl + '/get' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },
};

export default account;
