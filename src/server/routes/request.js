
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


/**
 * set payment to done and remove chat (will still be accessible in x time)
 * @param {string} requestID - The request id of the request to be changed status to done
 */
router.put('/completeRequest', async (req, res) =>
{
  const schema = Joi.object({
    requestID: Joi.string(),
  });

  if(valid(req.body, schema, res))
  {
    let response = await db.requests.setCompleted(req.body.requestID);
    if(reposnse != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * get available request in x radius from location.
 * @param {string} geoLocation - The current location of the provider
 */
router.get('/provider/getNearRequests', async (req, res) =>
{
  const params = {
    geoLocation: req.param('geoLocation'),
  };

  if(validParams(params, res))
  {
    let distance = 40; // TODO dont hardcode it
    let response = await db.requests.getNearby(params.geoLocation, distance, undefined);
    if(reposnse != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * select an available request
 * @param {string} providorID - The id of the provider with select a request to performed
 * @param {string} requestID - The id of the request to be selected
 */
router.get('/provider/set', async (req, res) => // TODO: Not get method
{
  const params = {
    providorID: req.param('providorID'),
    requestID: req.param('requestID')
  };

  if(validParams(params, res))
  {
    let response = await db.requests.getNearby(params.geoLocation, distance, undefined);
    if(reposnse != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * Get requests that the provider has set
 * @param {string} providorID - The id of the providers set requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
router.get('/provider/getUserProviding', async (req, res) =>
{
  const params = {
    providorID: req.param('providorID'),
    num: req.param('num')
  };

  if(validParams(params, res))
  {
    let response = await db.requests.getUserProviding(params.providorID, params.num);
    if(reposnse != null) return sendSuccess(res, response);
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
    requestID: Joi.string(),
    data: Joi.any()
  });

  let data = req.body.data;

  if(valid(req.body, schema, res) && validData(data, res))
  {
    let response = await db.requests.add(req.body.requestID, data.header, data.body, data.cost);
    if(reposnse != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * Get the users request
 * @param {string} requestID - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reasont
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
    if(reposnse != null) return sendSuccess(res, response);
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
    requestID: Joi.string(),
  });

  if(valid(req.body, schema, res))
  {
    let response = await db.requests.remove(req.body.requestID);
    if(reposnse != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

/**
 * give rating on service provider
 * @param {string} requestID - The requester id of the users who review the provider
 * @param {string} providorID - The id of the providers to be reviewed
 * @param {int} rating - A number between 0 and 5, where 5 is best rating.
 */

router.put('/requester/reviewProvider', async (req, res) =>
{
  const schema = Joi.object({
    requestID: Joi.string(),
    providorID: Joi.string(),
    rating: Joi.number().min(0).max(5)
  });

  if(valid(req.body, schema))
  {
    // dont know
    //let response = await db.requests.remove(req.body.requestID); // TODO
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * accept the provider 
 * @param {string} requestID - The id of the request that accepts the provider
 * @param {string} providorID - The id of the providers witch has set the request 
 */
router.put('/requester/acceptProvider', async (req, res) =>
{
  const schema = Joi.object({
    requestID: Joi.string(),
    providorID: Joi.string(),
  });

  if(valid(req.body, schema, res))
  {
    // bolean
    let response = await db.requests.setProvider(req.body.requestID, req.body.providorID);
    if(reposnse != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

module.exports = router;
