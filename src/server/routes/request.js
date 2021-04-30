/** @type {DBInterface} */
const db = require("../server");
const validate = require("./validate");
const valid = validate.valid;
const validParams = validate.validParams;
const validData = validate.validData;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { idSize } = require("./validate");
const { DBInterface } = require("../db/dbInterface");

/**
 * set payment to done and remove chat (will still be accessible in x time)
 * @param {string} requestID - The request id of the request to be changed status to done
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
 * @param {string} geoLocation - The current location of the provider
 * @param {int} maxDistance - The max distance from the given location
 * @param {int} maxRequests - The number of request that the provider wants to se
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
 * select an available request
 * @param {string} requestID - The id of the request to be selected
 * @param {string} providerID - The id of the provider with select a request to performed
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
 * Get requests that the provider has set
 * @param {string} providerID - The id of the providers set requests
 * @param {int} num - The number of how many requests to return starting from most reascent
 */
router.get('/provider/getUserProviding', async (req, res) =>
{
  const params = {
    providerID: req.param('providerID'),
    num: req.param('num')
  };

  if(validParams(params, res))
  {
    let response = await db.requests.getUserProviding(params.providerID, params.num);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * Create a new request
 * @param {string} requestID - The user id for the user who want to create the request
 * @param {json} data - A object of the request. Needs to match the structure of database request
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
 * Get the users request
 * @param {string} requestID - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reascent
 */
router.get('/requester/getMyRequest', async (req, res) => // TODO: change getMyRequest to getUserRequest
{
  const params = {
    requestID: req.param('requestID'),
    num: req.param('num')
  };

  if(validParams(params, res))
  {
    let response = await db.requests.getUserRequests(params.requestID, params.num);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * remove a request that the user has created
 * @param {string} requestID - The requester id of the users requests to be deleted
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
 * give rating on service provider
 * @param {string} requestID - The requester id of the users who review the provider
 * @param {string} providerID - The id of the providers to be reviewed
 * @param {int} rating - A number between 0 and 5, where 5 is best rating.
 */
router.put('/requester/reviewProvider', async (req, res) =>
{
  const schema = Joi.object({
    requestID: Joi.string(),
    providerID: Joi.string(),
    rating: Joi.number().min(0).max(5)
  });

  if(valid(req.body, schema, res))
  {
    // don't know
    //let response = await db.requests.remove(req.body.requestID); // TODO
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * accept the provider
 * @param {string} requestID - The id of the request to be selected
 * @param {string} providerID - The id of the provider with select a request to performed
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
