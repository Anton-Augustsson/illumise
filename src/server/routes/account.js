/**
 * This file contains REST API: account functions which handles sending/fetching data to/from the database
 */

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
 * @typedef credentials
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} email
 * @property {String} phone
 * @property {String} password
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

router.get('/getFromID', async (req, res) =>
{
    const params = { userID: req.param('userID') };

    if(validParams(params, res))
    {
        let response = await db.accounts.getFromID(params.userID);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

module.exports = router;
