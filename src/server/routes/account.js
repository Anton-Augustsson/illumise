
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
    let response = await db.accounts.add(c.firstName, c.lastName, c.email, "119", c.token, c.picture);
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
    let response = await db.accounts.update(req.body.userID, c.firstName, c.lastName, c.email, "119", c.token, c.picture);
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

/**
 * Gets the id of the user with the given email if the password matches
 * @async
 * @param {String} email The email of the user
 * @param {String} password The password of the user
 * @returns {?User} The id of the user
 */
router.get('/get', async (req, res) =>
{
  const params = {
    email: req.param('email'),
    password: req.param('password')
  };

  if(validParams(params, res))
  {
    let response = await db.accounts.get(params.email, params.password);
    if(response != null) return sendSuccess(res, response);
    else return sendFailure(res);
  }
});

/**
 * Gets the user with the given id
 * @async
 * @param {String} userID The email of the user
 * @returns {?User} The id of the user
 */
router.get('/getFromID', async (req, res) =>
{
    const params = { userID: req.param('userID') };

    if(validParams(params, res))
    {
        let response = await db.accounts.getFromID(params.userID);
        console.log(response);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

module.exports = router;
