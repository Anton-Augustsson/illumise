// =====================================================================================================
// This file describes the Localization class used in localization
// =====================================================================================================
//
// usage: Localization.getText("hello") will get the string tagged "hello" in the corresponding localization

import storage from "./localStorage/localStorage";

/**
 * @typedef LocalizationData
 * @property {String} langDefault
 * @property {[String]} data
 */

/**
 * @typedef {Object.<string, Object.<string, String>>} TextJSON
 */

const localizationPath = "../resources/localization";

/**
 * The class handling localization
 * @class
 * @example 
 * let text = Localization.getText("test");
 * 
 * @example
 * Localization.lang = "en";
 */
export class Localization
{
    /** @type {LocalizationData} @private */
    static _data = require(`${localizationPath}/data.json`);
    
    /** @type {String} @private */
    static _lang = undefined;

    /** @type {TextJSON} @private */
    static _textJSON = require(`${localizationPath}/text.json`);

    /**
     * Gets the current localization
     * @return {String} The current localization
     */
    static get lang()
    {
        if (this._lang === undefined) this.lang = this._data.langDefault;
        return this._lang;
    }

    /**
     * Sets the current localization
     */
    static set lang(value)
    {
        this._lang = value;
        storage.storeDataObject("lang", this._lang);
    }
    
    /**
     * @returns {[String]} A list of all language tags
     */
    static get langs()
    {
        return this._data.langs;
    }

    /**
     * Gets the localized text tagged 'tag'
     * @param {String} tag The tag the text has 
     * @returns {?String} The localized text with the given tag
     */
    static getText(tag)
    {
        try
        {
            return this._textJSON[this.lang][tag];
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
}