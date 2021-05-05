/**
 * This file contains REST API: request functions which handles sending/fetching data to/from the database
 */

/** @type {DBInterface} */
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
const { DBInterface } = require("../db/dbInterface");

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
    let response = await db.requests.getUserProviding(params.providerID, parseInt(params.num));
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
    let response = await db.requests.getUserRequests(params.userID, parseInt(params.num));
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
 * @param {String} requestID - (req.body) The id of the request the review is related to
 * @param {String} userIDTo - (req.body) The id of the user the review is for
 * @param {String} userIDFrom - (req.body) The id of the user writing the review
 * @param {String} message - (req.body) The message on the review
 * @param {number} value - (req.body) The rated score 0 - 5
 * @param {ReviewType} type - (req.body) The type of review 
 * @returns {Promise<Boolean>} If the review was added
 */
router.put('/requester/reviewProvider', async (req, res) =>
{
  const schema = Joi.object({
    requestID: Joi.string().min(idSize).max(idSize),
    userIDTo: Joi.string().min(idSize).max(idSize),
    userIDFrom: Joi.string().min(idSize).max(idSize),
    message: Joi.string(),
    rating: Joi.number().min(0).max(5),
    reviewType: Joi.string()
  });

  let b = req.body;
  let reviewType = ReviewType.Requester; //TODO CHANGE

  if(valid(b, schema, res))
  {
    let response = await db.reviews.add(b.userIDTo, b.userIDFrom, b.requestID, b.message, b.rating, reviewType);
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
 */
router.put('/requester/acceptProvider', async (req, res) =>
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

module.exports = router;
