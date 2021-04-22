// =====================================================================================================
// This file describes the Localization class used in localization
// =====================================================================================================
//
// usage: Localization.getText("hello") will get the string tagged "hello" in the corresponding localization

/**
 * @typedef LocalizationData
 * @property {String} langDefault
 * @property {[String]} data
 */

/**
 * @typedef {Object.<string, Object.<string, String>>} TextJSON
 */

const localizationPath = "../resources/localization/";

/**
 * The class handling localization
 * @class
 */
export class Localization
{
    /** @type {LocalizationData} @private */
    static _localizationData = require(`${localizationPath}/data.json`);
    
    /** @type {String} @private */
    static _lang = undefined;

    /**@type {?TextJSON} @private */
    static _textJSON = require(`${localizationPath}/text.json`);

    /**
     * Gets the current localization
     * @return The current localization
     */
    static get lang()
    {
        return this._lang;
    }

    /**
     * Sets the current localization
     */
    static set lang(value)
    {
        this._lang = value;
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
            if (this._lang == undefined) this._lang = this._localizationData.langDefault;
            return this._textJSON[this._lang][tag];
        }
        catch (error)
        {
            console.error(error);
            return null;
        }
    }
}