const { createError } = require('../src/handlers/main');
const { AttachmentBuilder } = require('discord.js');

/**
 * Creates a text file that includes a source-code, message, or a text.
 */

const TextFileGenerator = class TextFileGenerator {
    /**
     * Creates the text file.
     * @param {string} content - The content for the text file.
     * @param {object} config - Configure the file.
     * @public
     */

    constructor(content, config) {
        if (!content) throw new createError(0, 'Received \'content\' as an empty value.');

        if (content && typeof content !== 'string') throw new createError(2, '\'content\' is not a string.');
        if (config && typeof config !== 'object') throw new createError(2, '\'config\' is not an object.');

        this.content = content;

        if (config?.name) {
            this.name = config.name;
        } else this.name = 'file';

        if (config?.extension) {
            this.extension = config.extension;
        } else this.extension = 'txt';

        if (config?.description) {
            this.description = config.description;
        } else this.description = null;

        return new AttachmentBuilder(
            Buffer.from(content, "utf-8"), { name: `${this.name}.${this.extension}`, description: `${this.description}` }
        );
    };
};

module.exports = TextFileGenerator;