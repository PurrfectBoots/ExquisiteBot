const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

class ApplicationCommandChoice {
    /**
     * The ApplicationCommandChoice constructor parameters.
     * @param {string} name - The choice name.
     * @param {string | number} value - The choice ID.
     * @public
     */

    constructor(name, value) {
        if (!name) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'name');
        if (!value) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'value');

        if (typeof name !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'name', 'String');
        if (typeof value !== 'string' | typeof value !== 'number') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'value', 'String/Number');

        return {
            name: name,
            value: value
        };
    };
};

module.exports = ApplicationCommandChoice;