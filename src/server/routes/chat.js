
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
        chatID: Joi.string().min(idSize).max(idSize),
        msg: Joi.string(),
        isProvider: Joi.boolean()
    });

    let b = req.body;

    if(valid(b, schema, res))
    {
        // null
        let response = await db.chat.addMessage(b.chatID, b.msg, b.isProvider);
        if(response != false) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * get all messages from a specific chat
 * @param {string} userID - The id of the user that sends a message
 * @param {string} chatID - The id of the chat witch is between the provider and requester
 */
router.get('/getChat', async (req, res) =>
{
    const params = {
        requestID: req.param('requestID'),
        userID: req.param('userID'),
        isProvider: req.param('isProvider')
    };

    if(validParams(params, res))
    {
        let response = await db.chat.getChat(params.requestID, params.userID, params.isProvider);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

router.get('/getChats', async (req, res) =>
{
    const params = {
        requestID: req.param('requestID'),
        num: req.param('num')
    };

    if(validParams(params, res))
    {
        let response = await db.chat.getChats(params.requestID, params.num === "undefined" ? undefined : parseInt(params.num));
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

router.get('/getChatFromID', async (req, res) =>
{
    const params = { chatID: req.param('requestID') };

    if(validParams(params, res))
    {
        let response = await db.chat.getFromID(params.chatID);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

/**
 * Adds a new chat if no equivalent chat exists
 * @async
 * @param {String} requestID The id of the related request
 * @param {String} requesterID The id of the requester
 * @param {String} providerID The id of the provider
 * @returns {Promise<?String>} The id of the chat or null
 */

/**
 * setup a new chat for a new service provider
 * @param {string} requestID - The id of the request that is the chat should be created for
 * @param {[string]} usersID - The an array of two users
 */
router.put('/newChat', async (req, res) => // POST?
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
        requesterID: Joi.string().min(idSize).max(idSize),
        providerID: Joi.string().min(idSize).max(idSize)
    });

    console.log(req.body);
    if(valid(req.body, schema, res))
    {
        let response = await db.chat.add(req.body.requestID, req.body.requesterID, req.body.providerID);
        console.log(response);
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
