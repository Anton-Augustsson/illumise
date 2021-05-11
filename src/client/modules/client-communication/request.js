require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef Request
 * @property {number} dateCreated
 * @property {number} dateCompleted
 * @property {GeoLocation} geoLocation
 * @property {String} header
 * @property {String} body
 * @property {Number} const
 * @property {Boolean} isFulFilled
 * @property {String} creatorID
 * @property {String} providerID
 */

/**
 * Interface for communicating wih the server
 */
const request =
{
    serviceUrl: url + '/request',

    /**
     * set payment to done and remove chat (will still be accessible in x time)
     * @param {string} requestID - The request id of the request to be changed status to done
     */
    completeRequest: async function(requestID)
    {   
        let data = {requestID: requestID };
        let url = this.serviceUrl + '/completeRequest';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        return returnResponse(response);
    },

    /**
     * Gets the request with the given id
     * @param {string} requestID - The id of the request to find
     * @returns {Promise<?Request>}
     */
    get: async function(requestID)
    {
        let params = `?requestID=${requestID}`;
        let url = request.serviceUrl + '/get' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    provider:
    {
        /**
         * get available request in x radius from location.
         * @param {string} geoLocation - The current location of the provider
         * @param {int} maxDistance - The max distance to a location
         * @param {int} maxRequests - The number of request to send to send
         * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
         */
        getNearRequests: async function(geoLocation, maxDistance, maxRequests = undefined)
        {
            let geoLocationJSON = JSON.stringify(geoLocation);
            let params = '?geoLocation=' + geoLocationJSON + '&maxDistance=' + maxDistance + '&maxRequests=' + maxRequests;
            let url = request.serviceUrl + '/provider/getNearRequests' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

        /**
         * select an available request
         * @param {string} requestID - The id of the request to be selected
         * @param {string} providerID - The id of the provider with select a request to performed
         */
        set: async function(requestID, providerID)
        {   
            let body = {requestID: requestID, providerID: providerID};
            let url = request.serviceUrl + '/provider/set';
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
            return returnResponse(response);
        },

        /**
         * Get requests that the provider has set
         * @param {string} providerID - The id of the providers set requests 
         * @param {int} num - The number of how many requests to return starting from most resent
         */
        getUserProviding: async function(providerID, num = undefined)
        {
            let params = '?providerID=' + providerID + '&num=' + num;
            let url = request.serviceUrl + '/provider/getUserProviding' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

        /**
         * Adds a review
         * @async
         * @param {String} userIDTo The id of the user the review is for
         * @param {String} userIDFrom The id of the user writing the review
         * @param {String} requestID The id of the request the review is related to
         * @param {String} message The message on the review
         * @param {number} value The rated score 0 - 5
         * @returns {Promise<?Boolean>} If the review was added
         */
        reviewProvider: async function(userIDTo, userIDFrom, requestID, message, value)
        {
            let body = {requestID: requestID, user1ID: userIDTo, user2ID: userIDFrom, message: message, rating: value};
            let url = request.serviceUrl + '/provider/reviewProvider';
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
            return returnResponse(response);
        },

        /**
         * Gets the rating data from a user
         * @async
         * @param {String} userID The user that has the reviews
         * @returns {?RatingData} The rating data or null
         */
        getRating: async function(userID)
        {
            let params = '?userID=' + userID;
            let url = request.serviceUrl + '/provider/getRating' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },


        /**
         * Gets a specific review to a user
         * @async
         * @param {String} userID The id of the user that has the review
         * @param {String} requestID The id of the request related to the review
         * @returns {Promise<?Review>} The review or null
         */
        getSpecificToUser: async function(userID, requestID)
        {
            let params = '?userID=' + userID + '&requestID=' + requestID;
            let url = request.serviceUrl + '/provider/getSpecificToUser' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

        /**
         * Gets all reviews to a user
         * @async
         * @param {String} userID The id of the user that has the review
         * @returns {Promise<?[Review]>} An array of all reviews or null
         */
        getAllToUser: async function(userID)
        {
            let params = '?userID=' + userID;
            let url = request.serviceUrl + '/provider/getAllToUser' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

    },

    requester:
    {
        /**
         * Create a new request
         * @param {string} requestID - The user id for the user who want to create the request
         * @param {string} type - The type of the request
         * @param {json} data - A object of the request. Needs to match the structure of database request
         */
        newRequest: async function(requestID, type, data)
        {   
            let newReq = {requestID: requestID, type: type, data: data};
            let url = request.serviceUrl + '/requester/newRequest';
            let response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(newReq)
            });

            return returnResponse(response);
        },

        /**
         * Get the users request
         * @param {string} userID - The user id of the users requests
         * @param {int} num - The number of how many requests to return starting from most resent
         * @returns {Promise<[Request]>}
         */
        getUserRequest: async function(userID, num = undefined) // num is the number of my requests starting from most recent //async  await
        {
            let params = '?userID=' + userID + '&num=' + num;
            let url = request.serviceUrl + '/requester/getUserRequest' + params;
            let response = await fetch(url);

            return returnResponse(response);
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

            return returnResponse(response);
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

            return returnResponse(response);
        },

        /**
         * Adds a review
         * @async
         * @param {String} userIDTo The id of the user the review is for
         * @param {String} userIDFrom The id of the user writing the review
         * @param {String} requestID The id of the request the review is related to
         * @param {String} message The message on the review
         * @param {number} value The rated score 0 - 5
         * @returns {Promise<?Boolean>} If the review was added
         */
        reviewProvider: async function(userIDTo, userIDFrom, requestID, message, value)
        {
            let body = {requestID: requestID, user1ID: userIDTo, user2ID: userIDFrom, message: message, rating: value};
            let url = request.serviceUrl + '/requester/reviewProvider';
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            });
            return returnResponse(response);
        },

        /**
         * Gets a specific review to a user
         * @async
         * @param {String} userID The id of the user that has the review
         * @param {String} requestID The id of the request related to the review
         * @returns {Promise<?Review>} The review or null
         */
        getSpecificToUser: async function(userID, requestID)
        {
            let params = '?userID=' + userID + '&requestID=' + requestID;
            let url = request.serviceUrl + '/requester/getSpecificToUser' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

        /**
         * Gets all reviews to a user
         * @async
         * @param {String} userID The id of the user that has the review
         * @returns {Promise<?[Review]>} An array of all reviews or null
         */
        getAllToUser: async function(userID)
        {
            let params = '?userID=' + userID;
            let url = request.serviceUrl + '/requester/getAllToUser' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

    }
};

export default request;
