
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

/**
 * Gets the rating data from a user
 * @async
 * @param {String} userID The user that has the reviews
 * @param {ReviewType} type The type of review data to get
 * @returns {?RatingData} The rating data or null
 */
router.get('/review/getRating', async (req, res) =>
{
    const params = {
        userID: req.param('userID'),
        getProvider: req.param('getProvider')
    };

    let reviewType = getProvider? ReviewType.Provider : ReviewType.Requester;

    if(validParams(params, res))
    {
        let response = await db.reviews.getRating(params.userID, reviewType);
        if(response != null) return sendSuccess(res, response);
        else return sendFailure(res);
    }
});

module.exports = router;