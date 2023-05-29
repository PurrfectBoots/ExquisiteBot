const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');
const { AttachmentBuilder } = require('discord.js');

/** 
 * Generates a file for Discord using Buffer.
*/

class TextFileGenerator {
    /**
     * The TextFileGenerator constructor parameters.
     * @param {string} msg - The string text.
     * @public
     */

    constructor(msg) {
        if (!msg) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'msg');

        if (typeof msg !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'msg', 'String');

        this.message = msg;
    };

    /**
     * The file name, also must include the file extension. Ex: hello-world.py
     * @param {string} name - The file name.
     * @public
     */

    setFileName(name) {
        if (!name) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'name');

        if (typeof name !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'name', 'String');

        this.fileName = name;
        return this;
    };

    /**
     * The file description.
     * @param {string} description - [None]
     * @public
     */

    setFileDescription(description) {
        if (!description) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'description');

        if (typeof description !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'description', 'String');

        this.fileDescription = description;
        return this;
    };

    /**
     * Creates the file.
     * @returns {AttachmentBuilder}
     * @public
     */

    createFile() {
        return new AttachmentBuilder(
            Buffer.from(this.message, 'utf-8'), { name: this.fileName || 'file.txt', description: this.fileDescription || null }
        );
    };
};

module.exports = TextFileGenerator;