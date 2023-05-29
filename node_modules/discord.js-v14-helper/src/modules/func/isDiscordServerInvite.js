const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
 * Checks if a string includes a Discord server invite or not.
 * @function isDiscordServerInvite
 * @param {string} content - The string to check.
 * @returns {boolean}
 */

function isDiscordServerInvite(content) {
    if (!content) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'content');

    const regex = /discord(?:\.com|app\.com|\.gg)[\/invite\/]?(?:[a-zA-Z0-9\-]{2,32})/g;

    return regex.test(content);
};

module.exports = isDiscordServerInvite;