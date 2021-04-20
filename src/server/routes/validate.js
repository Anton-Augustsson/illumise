const express = require('express');
const router = express.Router();
const Joi = require('joi');

const validate =
{
    /**
    * Helping function to send error responce
    * @param {json} body - The resived request from the client
    * @param {json} schema - The json object to compare body with
    */
    valid: function(body, schema, res)
    {
        const result = schema.validate(body);

        if(result.error)
        {
            res.status(400).send(result.error.message);
            return false;
        }

        return true;
    },

    /**
    * Helping function to send error responce if the params is undefined
    * @param {array} params - Array
    */
    validParams: function(params, res)
    {
        for (let p in params)
        {
            if(params[p] == undefined){
            res.status(400).send(p + " is undefined");
            return false;
            }
        }
        return true;
    },

    /**
    * Helping function to send error responce if the attrebutes are undefined
    * @param {json} credentials - From the request body there is an atrebute credentials
    * @param {object} res - The responce
    */
    validCredentials: function(credentials, res)
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
    },

    validData: function(data, res)
    {
        let d = data;

        let validHeader = d.header != undefined;
        let validBody = d.body != undefined;
        let validCost = d.cost != undefined;

        if(validHeader && validBody && validCost){
            return true;
        }

        res.status(404).send("invalid data, should be: header, body, cost ");
        return false;
    },


    /**
    * Helping function to send error responce
    * @param {object} res - The responce
    * @param {json} message - The message that should be sent as responce. (undefined) is allowed
    */
    sendFailure: function(res, message)
    {
        let m = message;
        if(m == undefined) m = "unsucessful";
        res.status(404).send(m);
    },

    /**
    * Helping function to send error responce
    * @param {object} res - The responce
    * @param {json} objectResponce - The object to be returnd as an responce. (undefined) is allowed
    */
    sendSuccess: function(res, objectResponce)
    {
        let o = objectResponce;
        if(o == undefined) o = console.log(JSON.stringify(undefined));
        else o = JSON.stringify(o);
        res.send(o);
    }
};

module.exports = validate;
