const express = require('express');
const router = express.Router();
const Joi = require('joi');

/**
 * Helping function to send error responce
 * @param {json} body - The resived request from the client
 * @param {json} schema - The json object to compare body with
 */
function valid(body, schema)
{
  const result = schema.validate(body);

  if(result.error)
  {
    res.status(400).send(result.error.message);
    return false;
  }

  return true;
}

/**
 * sends a message to a person
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.put('/sendMessage', (req, res) =>
{
  const schema = Joi.object({
    userID: Joi.string(),
    chatID: Joi.string()
  });

  if(valid(req.body, schema))
  {
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * get all messages from a specific chat
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.get('/getAllMessages', (req, res) =>
{
  const schema = Joi.object({
    userID: Joi.string(),
    chatID: Joi.string()
  });

  if(valid(req.body, schema))
  {
    return res.send('Received a GET HTTP method');
  }
});

/**
 * setup a new chat for a new service provider
 * @param {string} requestID - The id of the request that is the chat should be created for
 */
router.put('/newChat', (req, res) => //FIXME: curl fail
{
  const schema = Joi.object({
    userID: Joi.string()
  });

  if(valid(req.body, schema))
  {
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * remove chat if no longer interested in chat
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.delete('/removeChat', (req, res) =>
{
  const schema = Joi.object({
    userID: Joi.string(),
  });

  if(valid(req.body, schema))
  {
    return res.send('Received a GET /removeChat HTTP method');
  }
});


module.exports = router;
