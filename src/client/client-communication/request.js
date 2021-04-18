require('isomorphic-fetch');

/**
 * Interface for communicating wih the server
 */
const request =
{
    serviceUrl: 'http://localhost:3000/request',

    /**
     * set payment to done and remove chat (will still be accessible in x time)
     * @param {string} requestID - The request id of the request to be changed status to done
     */
    completeRequest: async function(requestID)
    {   
        let data = 
        {requestID: requestID }
        let url = this.serviceUrl + '/completeRequest';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        let result = await response.json(); //should be .json
        console.log("completed request: " + result);
    },

    provider:
    {
        /**
         * get available request in x radius from location.
         * @param {string} geoLocation - The current location of the provider
         */
        getNearRequests: async function(geoLocation)
        {
            let params = '?geoLocation=' + geoLocation;
            let url = request.serviceUrl + '/provider/getNearRequests'+ params;
            let response = await fetch(url);
            
            let result = await response.text(); //should be json
            console.log(result);
        },

        /**
         * select an available request
         * @param {string} providerID - The id of the provider with select a request to performed
         * @param {string} requestID - The id of the request to be selected
         */
        set: async function(providerID, requestID)
        {   
            let params = '?providerID=' + providerID + '&requestID=' + requestID;
            let url = request.serviceUrl + '/provider/set' + params;
            let response = await fetch(url);

            let result = await response.text(); //should be json
            console.log(result);
        },

        /**
         * Get requests that the provider has set
         * @param {string} providerID - The id of the providers set requests 
         * @param {int} num - The number of how many requests to return starting from most reasont
         */
        getUserProviding: async function(providerID, num)
        {
            let params = '?providerID=' + providerID + '&num=' + num;
            let url = request.serviceUrl + '/provider/getUserProviding' + params;
            let response = await fetch(url);
            let result = await response.text();  //should be json
            console.log(result);
        }
    },

    requester:
    {
        /**
         * Create a new request
         * @param {string} requestID - The user id for the user who want to create the request
         * @param {json} data - A object of the request. Needs to match the structure of database request
         */
        newRequest: async function(requestID, data) //async
        {   
            let newReq = {requestID: requestID, data: data};
            console.log(newReq);
            let url = request.serviceUrl + '/requester/newRequest';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newReq)
            });

            let result = await response.text(); //should be json.
            console.log(result);
        },

        /**
         * Get the users request
         * @param {string} requestID - The user id of the users requests
         * @param {int} num - The number of how many requests to return starting from most resent
         */
        getUserRequest: async function(requestID, num) // num is the number of my requests starting from most recent //async  await
        {
            let params = '?requestID=' + requestID + '&num=' + num;
            let url = request.serviceUrl + '/requester/getMyRequest' + params;        
            let response = await fetch(url);

            let result = await response.text(); //should be json
            console.log(result);
        },

        /**
         * remove a request that the user has created
         * @param {string} requestID - The requester id of the users requests to be deleted
         */
        removeRequest: async function(requestID)
        {
            let url = request.serviceUrl + '/requester/removeRequest';
            let toRemove = {requestID: requestID};
            let response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(toRemove)
            });

            let result = await response.text() //should be json
            console.log(result);
        },

        /**
         * give rating on service provider
         * @param {string} requestID - The requester id of the users who review the provider
         * @param {string} providerID - The id of the providers to be reviewed
         * @param {int} rating - A number between 0 and 5, where 5 is best rating.
         */
        reviewProvider: async function(requestID, providerID, rating) 
        {
            let url = request.serviceUrl + '/requester/reviewProvider';
            let toRate = {requestID: requestID, providerID: providerID, rating: rating};
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(toRate)
            });

            let result = await response.text() //should be json
            console.log(result);
        },

        /**
         * accept the provider 
         * @param {string} requestID - The id of the request that accepts the provider
         * @param {string} providerID - The id of the providers witch has set the request 
         */
        acceptProvider: async function(requestID, providerID) 
        {
            let url = request.serviceUrl + '/requester/acceptProvider';
            let toAccept = {requestID: requestID, providerID: providerID};
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(toAccept)
            });

            let result = await response.text() //should be json
            console.log(result);
            
        }
    }
};

export default request;
