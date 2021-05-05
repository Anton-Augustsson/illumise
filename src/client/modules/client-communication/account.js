require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

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
    createAccount: async function(credentials, isTest = false)
    {
        let url = account.accountUrl + '/createAccount';
        let toCreate = {credentials: credentials, isTest: isTest};
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
    removeAccount: async function(userID, isTest = false)
    {
        let url = account.accountUrl + '/removeAccount';
        let toRemove = {userID: userID, isTest: isTest};
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
    changeCredentials: async function(userID, credentials, isTest = false)
    {
        let url = account.accountUrl + '/changeCredentials';
        let toUpdate = {userID: userID, credentials: credentials, isTest: isTest};
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
    get: async function(email, password, isTest = false)
    {
        let params = '?email=' + email + '&password=' + password + '&isTest=' + isTest;
        let url = account.accountUrl + '/get' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },
};

export default account;
