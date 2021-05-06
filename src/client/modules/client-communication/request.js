/**
 * This file contains the client communication: request functions which handles all external interaction
 * with the rest api
 */

require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef GeoLocation
 * @property {String} type
 * @property {[Coordinate]} coordinates 
 */

/**
 * @typedef Coordinate
 * @property {[longitude:Number, latitude:Number]} coordinates longitude, latitude 
 */

/**
 * The type of a review
 * @enum {number}
 * @property Provider
 * @property Requester
 */
 const ReviewType = 
 {
     Provider : 0,
     Requester: 1
 };

/**
 * Interface for communicating wih the server
 */
const request =
{
    serviceUrl: url + '/request',

    /**
     * set request as complete, payment is set to done and chat is removed (will still be accessible in x time)
     * @async
     * @param {string} requestID - The request id of the request to be changed status to complete
     * @returns {Promise<?Boolean>} If the operation was successful
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
     * Functions used by providers
     */
    provider:
    {
        /**
         * get available request in x radius from location.
        * @async
        * @param {GeoLocation} geoLocation - The location to search around
        * @param {Number} maxDistance - The maximum distance in meters to search from geoLocation
        * @param {Number} maxRequests - The number of nearby requests to retrieve
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
         * select provider for an avaiable request
         * @async
         * @param {string} requestID - The id of the request to be modified
         * @param {string} providerID - The id of the provider
         * @returns {Promise<?Boolean>} If the operation was successful
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
         * Gets requests that the user is set as a provider for
         * @async
         * @param {String} providerID - The id of the provider
         * @param {Number} num - The number of requests to get, if not set all will be returned
         * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
         */
        getUserProviding: async function(providerID, num)
        {
            let params = '?providerID=' + providerID + '&num=' + num;
            let url = request.serviceUrl + '/provider/getUserProviding' + params;
            let response = await fetch(url);

            return returnResponse(response);
        }
    },

    /**
     * Functions used by requester
     */
    requester:
    {
        /**
         * Create a new request
         * @async
         * @param {string} requestID - The user id of the user that wants to create a request
         * @param {string} type - The type of the request
         * @param {json} data - TODO
         * @returns {Promise<?String>} The id of the created request or null
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
         * Gets requests created by a user
         * @async
         * @param {String} userID - The id of the user
         * @param {Number} num - The number of requests to get, if not set all will be returned
         * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
         */
        getUserRequest: async function(userID, num) // num is the number of my requests starting from most recent //async  await
        {
            let params = '?userID=' + userID + '&num=' + num;
            let url = request.serviceUrl + '/requester/getUserRequest' + params;
            let response = await fetch(url);

            return returnResponse(response);
        },

        /**
         * Removes a request
         * @async
         * @param {String} requestID - The id of the request
         * @returns {Promise<?Boolean>} If the operation was successful
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
         * Adds a review
         * @async
         * @param {String} requestID - The id of the request the review is related to
         * @param {String} userIDTo - The id of the user the review is for
         * @param {String} userIDFrom - The id of the user writing the review
         * @param {String} message - The message on the review
         * @param {number} value - The rated score 0 - 5
         * @param {ReviewType} type - The type of review 
         * @returns {Promise<?Boolean>} If the review was added
         */
        reviewProvider: async function(requestID, userIDTo, userIDFrom, message, value, type)
        {
            let url = request.serviceUrl + '/requester/reviewProvider';
            let toRate = {requestID: requestID, userIDTo: userIDTo, userIDFrom: userIDFrom, message: message, value: value, type: type};
            let response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(toRate)
            });

            return returnResponse(response);
        },

        
        /**
         * Accept the provider of a request
         * @async
         * @param {String} requestID - The id of the request to modify
         * @param {String} providerID - The id of the provider
         * @returns {Promise<?Boolean>} If the operation was successful
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

        }
    }
};

export default request;
