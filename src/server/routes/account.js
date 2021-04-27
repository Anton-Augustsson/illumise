
const db = require("../server");
const validate = require("./validate");
const valid = validate.valid;
const validParams = validate.validParams;
const validCredentials = validate.validCredentials;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;

const express = require('express');
const router = express.Router();
const Joi = require('joi');


/**
 * create new account
 * @param {json} credentials - A object of the users credentials.
 */
router.put('/createAccount', async (req, res) =>
{
  const schema = Joi.object({
    credentials: Joi.any()
  });

  let c = req.body.credentials;

  if(valid(req.body, schema, res) && validCredentials(c, res))
  {
    let response = await db.accounts.add(c.firstName, c.lastName, c.email, "119", c.token);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * remove specified account
 * @param {string} userID - The user id of the account that should be deleted
 */
router.delete('/removeAccount', async (req, res) =>
{
  const schema = Joi.object({
    userID: Joi.string().min(24).max(24)
  });

  if(valid(req.body, schema, res))
  {
    let response = await db.accounts.remove(req.body.userID);
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

/**
 * enter key word and the value to be changed. Enter multiple keys and-values will be verified if they are correct keys. Or send an object that a class defines with values.
 * @param {string} userID - The user id of the account that should be changed
 * @param {json} credentials - A object of the users credentials.
 */
router.post('/changeCredentials', async (req, res) =>
{
  const schema = Joi.object({
    userID: Joi.string().min(24).max(24),
    credentials: Joi.any()
  });

  let c = req.body.credentials;

  if(valid(req.body, schema, res), validCredentials(c, res))
  {
    let response = await db.accounts.update(req.body.userID, c.firstName, c.lastName, c.email, "119", c.token);
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

module.exports = router;
