import React from 'react';
import Constants from "expo-constants";
const { manifest } = Constants;
const ip = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`) : "localhost:3000";

/**
 * helper functions for communication
 */
const communication =
{
    url: "http://" + ip,

    returnResponse: async function(response)
    {
        if (response.ok) {
            return await response.json();
        }
        else {
            return null;
        }
    },

};

export default communication;
