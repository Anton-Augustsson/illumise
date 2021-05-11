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
    serviceUrl: url + '/request',

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
        let url = review.serviceUrl + '/review/getRating' + params;
        let response = await fetch(url);

        return returnResponse(response);
    }
}

export default review;