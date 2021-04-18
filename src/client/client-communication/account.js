require('isomorphic-fetch');

/**
 * Managing user account both for service provider and service requester
 */
const account =
{
    accountUrl: 'http://localhost:3000/account',

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

        let result = await response.text(); //should be json
        console.log(result);
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

        let result = await response.text(); //should be json
        console.log(result);
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

        let result = await response.text(); //should be json
        console.log(result);
    },

};

export default account;
