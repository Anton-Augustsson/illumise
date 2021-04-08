const express = require('express');
const router = express.Router();
const Joi = require('joi');

/**
 * Helping function to send error responce
 */
function valid(body, schema){

  const result = schema.validate(body);

  if(result.error)
  {
    res.status(400).send(result.error.message);
    return false;
  }

  return true;
}


/**
 * set payment to done and remove chat (will still be accessible in x time)
 * @param {string} requestID - The request id of the request to be changed status to done
 */
router.put('/completeRequest', async (req, res) => {
  const schema = Joi.object({
    requestID: Joi.string(),
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * get available request in x radius from location.
 * @param {string} geoLocation - The current location of the provider
 */
router.get('/provider/getNearRequests', async (req, res) => { // FIXME: cant have body on get
  const schema = Joi.object({
    geoLocation: Joi.string(),
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a GET HTTP method');
  }
});

/**
 * select an available request
 * @param {string} providorID - The id of the provider with select a request to performed
 * @param {string} requestID - The id of the request to be selected
 */
router.get('/provider/selectRequest', async (req, res) => {
  // TODO: call server interface
  return res.send('Received a GET HTTP method');
});

/**
 * Get requests that the provider has set
 * @param {string} providorID - The id of the providers set requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
router.get('/provider/getUserProviding', async (req, res) => {
  // TODO: call server interface
  return res.send('Received a GET HTTP method');
});

/**
 * Create a new request
 * @param {string} requestID - The user id for the user who want to create the request
 * @param {json} data - A object of the request. Needs to match the structure of database request
 */
router.post('/requester/newRequest', async (req, res) => {
  const schema = Joi.object({
    requestID: Joi.string(),
    data: Joi.any()
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a POST HTTP method newRequest');
  }
});

/**
 * Get the users request
 * @param {string} requestID - The user id of the users requests
 * @param {int} num - The number of how many requests to return starting from most reasont
 */
router.get('/requester/getMyRequest', async (req, res) => {
  // TODO: call server interface
  return res.send('Received a GET /requester/getMyRequest HTTP method');
});

/**
 * remove a request that the user has created
 * @param {string} requestID - The requester id of the users requests to be deleted
 */
router.delete('/requester/removeRequest', async (req, res) => {
  const schema = Joi.object({
    requestID: Joi.string(),
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a GET /requester/removeRequest HTTP method');
  }
});

/**
 * give rating on service provider
 * @param {string} requestID - The requester id of the users who review the provider
 * @param {string} providorID - The id of the providers to be reviewed
 * @param {int} rating - A number between 0 and 5, where 5 is best rating.
 */

router.put('/requester/reviewProvider', async (req, res) => {
  const schema = Joi.object({
    requestID: Joi.string(),
    providorID: Joi.string(),
    rating: Joi.number.min(0).max(5)
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * accept the provider 
 * @param {string} requestID - The id of the request that accepts the provider
 * @param {string} providorID - The id of the providers witch has set the request 
 */
router.put('/requester/acceptProvider', async (req, res) => {
  const schema = Joi.object({
    requestID: Joi.string(),
    providorID: Joi.string(),
  });

  if(valid(req.body, schema)){
    // TODO: call server interface
    return res.send('Received a PUT HTTP method');
  }
});

module.exports = router;
