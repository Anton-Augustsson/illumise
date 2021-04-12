
const db = require("../server");
const express = require('express');
const router = express.Router();
const Joi = require('joi');

/**
 * Helping function to send error responce
 * @param {json} body - The resived request from the client
 * @param {json} schema - The json object to compare body with
 */
function valid(body, schema, res)
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
 * Helping function to send error responce
 * @param {array} params - Array
 */
function validParams(params, res)
{
  for (let p in params)
  {
    if(params[p] == undefined){
      res.status(400).send(p + " is undefined");
      return false;
    }
  }
  return true;
}

/**
 * sends a message to a person
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.put('/sendMessage', async (req, res) => // post?
{
  const schema = Joi.object({
    userID: Joi.string(),
    chatID: Joi.string()
  });

  let b = req.body;

  if(valid(b, schema, res))
  {
    let response = await db.chat.add(b.userID, b.chatID);
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * get all messages from a specific chat
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.get('/getAllMessages', async (req, res) =>
{
  const params = {
    userID: req.param('userID'), //TODO: dont need userID upto client to determen who is who
    chatID: req.param('chatID')
  };

  if(validParams(params, res))
  {
    let response = await db.chat.get(params.chatID);
    return res.send('Received a GET Get all messages HTTP method');
  }
});

/**
 * setup a new chat for a new service provider
 * @param {string} requestID - The id of the request that is the chat should be created for
 */
router.put('/newChat', async (req, res) => // POST?
{
  const schema = Joi.object({
    requestID: Joi.string() // TODO userID do you need it?
  });

  let b = req.body;

  if(valid(b, schema, res))
  {
    //let response = await db.chat.add(b.requestID); TODO
    return res.send('Received a PUT HTTP method');
  }
});

/**
 * remove chat if no longer interested in chat
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.delete('/removeChat', async (req, res) =>
{
  const schema = Joi.object({
    chatID: Joi.string(),
  });

  let b = req.body;

  if(valid(req.body, schema, res))
  {
    let response = await db.chat.remove(b.chatID);
    return res.send('Received a GET /removeChat HTTP method');
  }
});


module.exports = router;
