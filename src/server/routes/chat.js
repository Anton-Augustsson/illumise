
const db = require("../server");
const validate = require("./validate");
const valid = validate.valid;
const validParams = validate.validParams;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;
const idSize      = validate.idSize;

const express = require('express');
const router = express.Router();
const Joi = require('joi');

/**
 * sends a message to a person
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.put('/sendMessage', async (req, res) => // post?
{
  const schema = Joi.object({
    userID: Joi.string().min(idSize).max(idSize),
    chatID: Joi.string().min(idSize).max(idSize),
    msg: Joi.string()
  });

  let b = req.body;

  if(valid(b, schema, res))
  {
    // null
    let response = await db.chat.addMessage(b.userID, b.chatID, b.msg);
    if(response != false) return sendSuccess(res, response);
    else return sendFailure(res);
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
    let response = await db.chat.getMessages(params.chatID);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * setup a new chat for a new service provider
 * @param {string} requestID - The id of the request that is the chat should be created for
 * @param {[string]} usersID - The an array of two users
 */
router.put('/newChat', async (req, res) => // POST?
{
  const schema = Joi.object({
    requestID: Joi.string(),
    usersID: Joi.array().min(2).items(Joi.string())
  });

  let b = req.body;

  if(valid(b, schema, res))
  {
    let response = await db.chat.add(b.requestID, b.usersID);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
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
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});


module.exports = router;
