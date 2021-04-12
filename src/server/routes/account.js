
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

function validCredentials(credentials, res){
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
    return res.send('Received a PUT HTTP method');
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
    console.log(req.body.userID);
    let response = await db.accounts.remove(req.body.userID);
    return res.send('Received a DELETE /removeAcount HTTP method');
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
    return res.send('Received a PUT HTTP method');
  }
});

module.exports = router;
