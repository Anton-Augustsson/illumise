/**
 * This file contains REST API: request functions which handles sending/fetching data to/from the database
 */

const db = require("../server");
const validate = require("./validate");
const valid = validate.valid;
const validParams = validate.validParams;
const validData = validate.validData;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;
const { ReviewType }  = require("../db/dbReviewsInterface");

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { idSize } = require("./validate");

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

/**
 * set request as complete, payment is set to done and chat is removed (will still be accessible in x time)
 * @async
 * @param {string} requestID -  (req.body) The request id of the request to be changed status to complete
 * @returns {Promise<Boolean>} If the operation was successful
 */
router.put('/completeRequest', async (req, res) =>
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
    });

    if(valid(req.body, schema, res))
    {
        let response = await db.requests.setCompleted(req.body.requestID);
        if(response != false) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * get available request in x radius from location.
* @async
* @param {GeoLocation} geoLocation - (req.param) The location to search around
* @param {Number} maxDistance - (req.param) The maximum distance in meters to search from geoLocation
* @param {Number} maxRequests - (req.param) The number of nearby requests to retrieve
* @returns {Promise<?[Request]>} The requests BSON objects in a list or null
*/
router.get('/provider/getNearRequests', async (req, res) =>
{
    const params = {
        geoLocation: req.param('geoLocation'),
        maxDistance: req.param('maxDistance'),
        maxRequests: req.param('maxRequests'),
    };
    if(validParams(params, res))
    {
        let geo  = JSON.parse(params.geoLocation);
        let dist = parseFloat(params.maxDistance);
        let num  = params.maxRequests === 'undefined' ? undefined : parseInt(params.maxRequests);
        let response = await db.requests.getNearby(geo, dist, num);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * select provider for an avaiable request
 * @async
 * @param {string} requestID - (req.body) The id of the request to be modified
 * @param {string} providerID - (req.body) The id of the provider
 * @returns {Promise<Boolean>} If the operation was successful
 */
router.put('/provider/set', async (req, res) =>
{
    const schema = Joi.object ({
        requestID: Joi.string().min(idSize).max(idSize),
        providerID: Joi.string().min(idSize).max(idSize),
    });

    let body = req.body;

    if(valid(body, schema, res))
    {
        // TODO change from setProvider to something else that simply shows the interest of providing
        let response = await db.requests.setProvider(body.requestID, body.providerID);
        if(response != false) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets the request with the given id
 * @async
 * @param {String} requestID The id of the request
 * @returns {Promise<?Request>} The requests BSON objects in a list or null
 */
router.get('/get', async (req, res) =>
{
    const params = { requestID: req.param('requestID')};
    
    if(validParams(params, res))
    {
        let response = await db.requests.get(params.requestID);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets requests that the user is set as a provider for
 * @async
 * @param {String} providerID - (req.param) The id of the provider
 * @param {Number} num - (req.param) The number of requests to get, if not set all will be returned
 * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
 */
router.get('/provider/getUserProviding', async (req, res) =>
{
    const params = {
        providerID: req.param('providerID'),
        num: req.param('num')
    };

    if(validParams(params, res))
    {
        let response = await db.requests.getUserProviding(params.providerID, params.num === "undefined" ? undefined : parseInt(params.num));
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Create a new request
 * @async
 * @param {string} requestID - (req.body) The user id of the user that wants to create a request
 * @param {string} type - (req.body) The type of the request
 * @param {json} data - (req.body) TODO
 * @returns {Promise<?String>} The id of the created request or null
 */
router.post('/requester/newRequest', async (req, res) =>
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
        type: Joi.string(),
        data: Joi.any()
    });

    let body = req.body;
    let data = body.data;

    if(valid(body, schema, res) && validData(data, res))
    {
        let response = await db.requests.add(body.requestID, body.type, data.body, data.geoLocation, data.cost);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets requests created by a user
 * @async
 * @param {String} userID (req.param) The id of the user
 * @param {Number} num (req.param) The number of requests to get, if not set all will be returned
 * @returns {Promise<?[Request]>} The requests BSON objects in a list or null
 */
router.get('/requester/getUserRequest', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        num: req.param('num')
    };

    if(validParams(params, res))
    {
        let response = await db.requests.getUserRequests(params.userID, params.num === "undefined" ? undefined : parseInt(params.num));
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Removes a request
 * @async
 * @param {String} requestID - (req.body) The id of the request
 * @returns {Promise<Boolean>} If the operation was successful
 */
router.delete('/requester/removeRequest', async (req, res) =>
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
    });

    if(valid(req.body, schema, res))
    {
        let response = await db.requests.remove(req.body.requestID);
        if(response != false) return sendSuccess(res);
        else return sendFailure(res);
    }
});

/**
 * Adds a review
 * @async
<<<<<<< HEAD
 * @param {String} userIDTo The id of the user the review is for
 * @param {String} userIDFrom The id of the user writing the review
 * @param {String} requestID The id of the request the review is related to
 * @param {String} message The message on the review
 * @param {number} value The rated score 0 - 5
=======
 * @param {String} requestID - (req.body) The id of the request the review is related to
 * @param {String} userIDTo - (req.body) The id of the user the review is for
 * @param {String} userIDFrom - (req.body) The id of the user writing the review
 * @param {String} message - (req.body) The message on the review
 * @param {number} value - (req.body) The rated score 0 - 5
 * @param {ReviewType} type - (req.body) The type of review 
>>>>>>> main
 * @returns {Promise<Boolean>} If the review was added
 */
router.put('/requester/reviewProvider', async (req, res) =>
{
<<<<<<< HEAD
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
        user1ID: Joi.string().min(idSize).max(idSize),
        user2ID: Joi.string().min(idSize).max(idSize),
        message: Joi.string(),
        rating: Joi.number().min(0).max(5),
    });

    let b = req.body;
    let reviewType = ReviewType.Requester;

    if(valid(b, schema, res))
    {
        let response = await db.reviews.add(b.user1ID, b.user2ID, b.requestID, b.message, b.rating, reviewType);
        if(response != false) return sendSuccess(res);
        else return sendFailure(res);
    }
});

/**
 * Adds a review
 * @async
 * @param {String} userIDTo The id of the user the review is for
 * @param {String} userIDFrom The id of the user writing the review
 * @param {String} requestID The id of the request the review is related to
 * @param {String} message The message on the review
 * @param {number} value The rated score 0 - 5
 * @returns {Promise<Boolean>} If the review was added
 */
router.put('/provider/reviewProvider', async (req, res) =>
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
        user1ID: Joi.string().min(idSize).max(idSize),
        user2ID: Joi.string().min(idSize).max(idSize),
        message: Joi.string(),
        rating: Joi.number().min(0).max(5),
    });

    let b = req.body;
    let reviewType = ReviewType.Provider;

    if(valid(b, schema, res))
    {
        let response = await db.reviews.add(b.user1ID, b.user2ID, b.requestID, b.message, b.rating, reviewType);
        if(response != false) return sendSuccess(res);
        else return sendFailure(res);
    }
});

/**
 * Gets a specific review to a user
 * @async
 * @param {String} userID The id of the user that has the review
 * @param {String} requestID The id of the request related to the review
 * @param {ReviewType} type The type of review
 * @returns {Promise<?Review>} The review or null
 */
router.get('/provider/getSpecificToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        requestID: req.param('requestID'),
    };

    let reviewType = ReviewType.Provider;

    if(validParams(params, res))
    {
        let response = await db.reviews.getSpecificToUser(params.userID, params.requestID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets a specific review to a user
 * @async
 * @param {String} userID The id of the user that has the review
 * @param {String} requestID The id of the request related to the review
 * @param {ReviewType} type The type of review
 * @returns {Promise<?Review>} The review or null
 */
router.get('/requester/getSpecificToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        requestID: req.param('requestID'),
    };

    let reviewType = ReviewType.Requester;

    if(validParams(params, res))
    {
        let response = await db.reviews.getSpecificToUser(params.userID, params.requestID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets all reviews to a user
 * @async
 * @param {String} userID The id of the user that has the review
 * @param {ReviewType} type The type of review
 * @returns {Promise<?[Review]>} An array of all reviews or null
 */
router.get('/requester/getAllToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
    };

    let reviewType = ReviewType.Requester;

    if(validParams(params, res))
    {
        let response = await db.reviews.getAllToUser(params.userID, params.requestID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Gets all reviews to a user
 * @async
 * @param {String} userID The id of the user that has the review
 * @param {ReviewType} type The type of review
 * @returns {Promise<?[Review]>} An array of all reviews or null
 */
router.get('/provider/getAllToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
    };

    let reviewType = ReviewType.Provider;

    if(validParams(params, res))
    {
        let response = await db.reviews.getAllToUser(params.userID, params.requestID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});


/**
 * accept the provider
 * @param {string} requestID - The id of the request to be selected
 * @param {string} providerID - The id of the provider with select a request to performed
=======
  const schema = Joi.object({
    requestID: Joi.string().min(idSize).max(idSize),
    userIDTo: Joi.string().min(idSize).max(idSize),
    userIDFrom: Joi.string().min(idSize).max(idSize),
    message: Joi.string(),
    value: Joi.number().min(0).max(5),
    type: Joi.string()
  });

  let b = req.body;
  let reviewType = ReviewType.Requester; //TODO CHANGE

  if(valid(b, schema, res))
  {
    let response = await db.reviews.add(b.userIDTo, b.userIDFrom, b.requestID, b.message, b.value, reviewType);
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

/**
 * Accept the provider of a request
 * @async
 * @param {String} requestID - The id of the request to modify
 * @param {String} providerID - The id of the provider
 * @returns {Promise<Boolean>} If the operation was successful
>>>>>>> main
 */
router.put('/requester/acceptProvider', async (req, res) =>
{
    const schema = Joi.object ({
        requestID: Joi.string().min(idSize).max(idSize),
        providerID: Joi.any(),
    });

    let body = req.body;

    if(valid(body, schema, res))
    {
        // TODO change from setProvider to something else that simply shows the interest of providing
        let response = await db.requests.setProvider(body.requestID, body.providerID);
        if(response != false) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

module.exports = router;
