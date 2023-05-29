const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
 * Checks if a string is including a website URL or not.
 * @function isWebURL
 * @param {string} content - The string to check.
 * @param {Array} ignoreURLs - Ignore URLs.
 * @returns {boolean}
 */

function isWebURL(content, ignoreURLs) {
    if (!content) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'content');

    if (typeof content !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'content');

    if (!Array.isArray(ignoreURLs)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'ignoreURLs');

    const regex = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#\/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#\/%=~_|$?!:,.]*\)|[A-Z0-9+&@#\/%=~_|$])/igm;

    const output = regex.test(content);

    let urls = content.match(regex);

    urls = urls.filter((url) => !ignoreURLs.find((web) => url.includes(web)));

    if (!urls.length) return false;

    return output;
};

module.exports = isWebURL;