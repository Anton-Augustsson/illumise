
const db = require("../server");
const validate = require("./validate");
const valid = validate.valid;
const validParams = validate.validParams;
const validData = validate.validData;
const sendFailure = validate.sendFailure;
const sendSuccess = validate.sendSuccess;
const { ReviewType }  = require("../db/dbReviewsInterface");

const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { idSize } = require("./validate");

router.post('review/addReview', async (req, res) =>
{
    const schema = Joi.object({
        userIDTo: Joi.string().min(idSize).max(idSize),
        userIDFrom: Joi.string().min(idSize).max(idSize),
        requestID: Joi.string().min(idSize).max(idSize),
        message: Joi.string(),
        value: Joi.number(),
        toProvider: Joi.boolean()
    });

    let body = req.body;
    let data = body.data;

    if(valid(body, schema, res) && validData(data, res))
    {
        let reviewType = body.toProvider == "true" 
                   ? ReviewType.Provider 
                   : ReviewType.Requester;

        let response = await db.reviews.add(body.userIDTo, body.userIDFrom, body.requestID, body.message, body.value, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

router.get('/review/getRating', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        getProvider: req.param('getProvider')
    };

    let reviewType = getProvider == "true" 
                   ? ReviewType.Provider 
                   : ReviewType.Requester;

    if(validParams(params, res))
    {
        let response = await db.reviews.getRating(params.userID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

router.get('/review/getAllToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        getProvider: req.param('getProvider')
    };

    let reviewType = getProvider == "true" 
                   ? ReviewType.Provider 
                   : ReviewType.Requester;

    if(validParams(params, res))
    {
        let response = await db.reviews.getAllToUser(params.userID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

module.exports = router;