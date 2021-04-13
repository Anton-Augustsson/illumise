
//const { DBInterface } = require("../db/dbInterface");
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
 * Helping function to send error responce if the params is undefined
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
 * Helping function to send error responce if the attrebutes are undefined
 * @param {json} credentials - From the request body there is an atrebute credentials
 * @param {object} res - The responce
 */
function validCredentials(credentials, res)
{
  let c = credentials;

  let validFirstName = c.firstName != undefined;
  let validLastName = c.lastName != undefined;
  let validEmail = c.email != undefined;
  let validToken = c.token != undefined;

  if(validFirstName && validLastName && validEmail && validToken){
    return true;
  }

  res.status(404).send("invalid credentials, should be: firtsName, lastName, email, token ");
  return false;
}

/**
 * Helping function to send error responce
 * @param {object} res - The responce
 * @param {json} message - The message that should be sent as responce. (undefined) is allowed
 */
function sendFailure(res, message)
{
  let m = message;
  if(m == undefined) m = "unsucessful";
  res.status(404).send(m);
}

/**
 * Helping function to send error responce
 * @param {object} res - The responce
 * @param {json} objectResponce - The object to be returnd as an responce. (undefined) is allowed
 */
function sendSuccess(res, objectResponce)
{
  let o = objectResponce;
  if(o == undefined) o = console.log(JSON.stringify(undefined));
  else o = JSON.stringify(o);
  res.status(404).send(o);
}

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
    let response = await db.accounts.add(c.firstName, c.lastName, c.email, c.token);
    if(reposnse != null) return sendSuccess(res, response);
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
    userID: Joi.string()
  });

  if(valid(req.body, schema, res))
  {
    let response = await db.accounts.remove(req.body.userID);
    if(reposnse != false) return sendSuccess(res);
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
    userID: Joi.string(),
    credentials: Joi.any()
  });

  let c = req.body.credentials;

  if(valid(req.body, schema, res), validCredentials(c, res))
  {
    let response = await db.accounts.update(req.body.userID, c.firstName, c.lastName, c.email, c.token);
    if(response != false) return sendSuccess(res);
    else return sendFailure(res);
  }
});

module.exports = router;
