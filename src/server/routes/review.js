
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

router.put('/addReview', async (req, res) =>
{
    const schema = Joi.object({
        userIDTo: Joi.string().min(idSize).max(idSize),
        userIDFrom: Joi.string().min(idSize).max(idSize),
        requestID: Joi.string().min(idSize).max(idSize),
        message: Joi.any(),
        value: Joi.any(),
        toProvider: Joi.any()
    });

    let b = req.body;
    if(valid(b, schema, res))
    {
        let reviewType = b.toProvider
                       ? ReviewType.Provider
                       : ReviewType.Requester;

        let result = await db.reviews.add(b.userIDTo, b.userIDFrom, b.requestID, b.message, b.value, reviewType);
        return result? sendSuccess(res, result) : sendFailure(res);
    }
});

router.get('/getRating', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        getProvider: req.param('getProvider')
    };

    if(validParams(params, res))
    {
        let reviewType = params.getProvider == "true" 
                       ? ReviewType.Provider 
                       : ReviewType.Requester;

        let result = await db.reviews.getRating(params.userID, reviewType);
        return result? sendSuccess(res, result) : sendFailure(res);
    }
});

router.get('/getAllToUser', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        getProvider: req.param('getProvider')
    };

    let reviewType = params.getProvider == "true" 
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