/**
 * This file contains REST API: chat functions which handles sending/fetching data to/from the database
 */

const db = require("../server");
const validate = require("./validate");
const express = require('express');
const Joi = require('joi');

const router      = express.Router();
const valid       = validate.valid;
const validParams = validate.validParams;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;
const idSize      = validate.idSize;

router.put('/sendMessage', async (req, res) =>
{
    const schema = Joi.object({
        chatID: Joi.string().min(idSize).max(idSize),
        msg: Joi.string(),
        isProvider: Joi.boolean()
    });

    let b = req.body;

    if(valid(b, schema, res))
    {
        let result = await db.chat.addMessage(b.chatID, b.msg, b.isProvider);
        if (result) return sendSuccess(res, result);
        else return sendFailure(res);
    }
});

router.get('/getChatsFrom', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        isProvider: req.param('isProvider'),
        num: req.param('num')
    };

    if(validParams(params, res))
    {
        let response = await db.chat.getChatsFrom(params.userID, params.isProvider === "true", params.num === "undefined" ? undefined : parseInt(params.num));
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

router.get('/getChat', async (req, res) =>
{
    const params = {
        requestID: req.param('requestID'),
        userID: req.param('userID'),
        isProvider: req.param('isProvider')
    };

    if(validParams(params, res))
    {
        let response = await db.chat.getChat(params.requestID, params.userID, params.isProvider === "true");
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

router.put('/newChat', async (req, res) => // POST?
{
    const schema = Joi.object({
        requestID: Joi.string().min(idSize).max(idSize),
        requesterID: Joi.string().min(idSize).max(idSize),
        providerID: Joi.string().min(idSize).max(idSize)
    });

    if(valid(req.body, schema, res))
    {
        let response = await db.chat.add(req.body.requestID, req.body.requesterID, req.body.providerID);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

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
