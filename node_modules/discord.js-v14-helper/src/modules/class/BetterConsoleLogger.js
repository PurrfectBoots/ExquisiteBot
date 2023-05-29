const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
 * Convert a string text into a string text with ASCII color codes. (Warn: This might not work with online IDEs such as repl.it.)
 */

class BetterConsoleLogger {
    /**
     * The BetterConsoleLogger constructor parameters.
     * @param {string} msg - The string text to change it's color.
     * @public
     */

    constructor(msg) {
        if (!msg) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'msg');

        this.message = msg.toString();
    };

    /**
     * Sets the text color.
     * @param {string} color - The color code name, import "Colors" from this library.
     * @public
     */

    setTextColor(color) {
        if (!color) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'color');

        if (typeof color !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'color', 'String');

        const colors = require('../../data/JSON/main.json').data['color-codes'].colors;

        this.colorText = colors[color] || colors['black'];
        return this;
    };

    /**
     * Sets the text background color.
     * @param {string} color - The color code name, import "Colors" from this library.
     * @public
     */

    setBackgroundColor(color) {
        if (!color) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'color');

        if (typeof color !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'color', 'String');

        const colors = require('../../data/JSON/main.json').data['color-codes'].bgColors;

        this.colorBg = colors[color] || colors['black'];
        return this;
    };

    /**
     * Sets the text into bold style.
     * @param {boolean} bool - [None]
     * @public
     */

    setBold(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.bold = bool;
        return this;
    };

    /**
     * Sets the text into underlined style.
     * @param {boolean} bool - [None]
     * @public
     */

    setUnderlined(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.underline = bool;
        return this;
    };

    /**
     * Sets the text into crossed style.
     * @param {boolean} bool - [None]
     * @public
     */

    setCrossedOut(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.cross = bool;
        return this;
    };

    /**
     * Shows the current time when the string message was converted or logged into the console.
     * @param {boolean} bool - [None]
     * @public
     */

    showCurrentTime(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.showTime = bool;
        return this;
    };

    /**
     * Returns the converted string text or logs directly into the console.
     * @param {boolean} logDirectly - When this is 'false' or empty, it will return a string, so you need to use "console.log()". If 'true', then it will auto log the string message in the console.
     * @returns {string}
     * @public
     */

    log(logDirectly) {
        if (logDirectly) {
            if (typeof logDirectly !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');
        };

        const fullString = `${this.showTime ? `[\x1b[90m${(new Date().toTimeString()).split(' ')[0]}\x1b[0m] ` : ''}${this.colorText ? `\x1b[${this.colorText}m` : ''}${this.colorBg ? `\x1b[${this.colorBg}m` : ''}${this.bold ? `\x1b[1m` : ''}${this.underline ? `\x1b[4m` : ''}${this.cross ? `\x1b[9m` : ''}${this.message}\x1b[0m`;
        
        if (logDirectly === true) {
            return console.log(fullString);
        } else {
            return fullString;
        };
    };
};

module.exports = BetterConsoleLogger;