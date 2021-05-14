require('isomorphic-fetch');
import communication from './communication';
const url = communication.url;
const returnResponse = communication.returnResponse;

/**
 * @typedef Review
 * @property {Number} value
 * @property {String} message
 * @property {Number} dateCreated
 * @property {String} creatorID
 * @property {String} requestID
 * @property {String} targetID
 */

/**
 * @typedef RatingData
 * @property {Number} averageRating
 * @property {Number} numRatings
 */

const review =
{
    serviceUrl: url + '/review',

    /**
     * Gets the rating data from a user
     * @async
     * @param {String} userID The user that has the reviews
     * @param {Boolean} getProvider If the provider data should be accessed
     * @returns {Promise<?RatingData>} The rating data or null
     */
    getRating: async function(userID, getProvider)
    {
        let params = '?userID=' + userID + '&getProvider=' + getProvider;
        let url = review.serviceUrl + '/getRating' + params;
        let response = await fetch(url);

        return returnResponse(response);
    },

    /**
     * Gets all reviews data to a user
     * @async
     * @param {String} userID The user that has the reviews
     * @param {Boolean} getProvider If the provider data should be accessed
     * @returns {Promise<?RatingData>} The rating data or null
     */
    getAllToUser: async function(userID, getProvider)
    {
        let params = '?userID=' + userID + '&getProvider=' + getProvider;
        let url = review.serviceUrl + '/getAllToUser' + params;
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
     * @param {Number} value The rated score 0 - 5
     * @param {Boolean} toProvider The type of review 
     * @returns {Promise<?Boolean>} If the review was added
     */
    add: async function(userIDTo, userIDFrom, requestID, message, value, toProvider)
    {
        let data = {userIDTo: userIDTo, userIDFrom: userIDFrom, 
                    requestID: requestID, message: message, 
                    value: value, toProvider: toProvider};
        let url = review.serviceUrl + '/addReview';
        let response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        });
        return returnResponse(response);
    }
}

export default review;