/**
 * This file contains REST API: chat functions which handles sending/fetching data to/from the database
 */

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
 * sends message to chat
 * @async
 * @param {string} userID - (req.body) The id of the user that sends a message
 * @param {string} chatID - (req.body) The id of the chat the user wants to send a message to
 * @param {string} msg - (req.body) The message the current user wants to send
 * @returns {Promise<Boolean>} If the message was added successfully to chat
 */
router.put('/sendMessage', async (req, res) => // post?
{
  const schema = Joi.object({
    chatID: Joi.string().min(idSize).max(idSize),
    userID: Joi.string().min(idSize).max(idSize),
    msg: Joi.string()
  });

  let b = req.body;

  if(valid(b, schema, res))
  {
    // null
    let response = await db.chat.addMessage(b.chatID, b.userID, b.msg);
    if(response != false) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * get all messages from a chat
 * @async
 * @param {string} chatID - (req.param) The id of the chat
 * @returns {Promise<?MessageCollection>} The message collection
 */
router.get('/getAllMessages', async (req, res) =>
{
  const params = {
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
 * setup a new chat between users
 * @async
 * @param {string} requestID - (req.body) The id of the request that is the chat should be created for
 * @param {[string]} usersID - (req.body) The an array of two users
 * @returns {Promise<?String>} The id of the chat or null
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
 * removes chat
 * @async
 * @param {string} chatID - (req.body) The id of the chat to be removed
 * @returns {Promise<Boolean>} If the operation was successful
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
