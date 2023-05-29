const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
 * Creates a new application option.
 * @class ApplicationCommandOptionsBuilder
 */

class ApplicationCommandOptionsBuilder {
    /**
     * The ApplicationCommandOptionsBuilder constructor parameters. [Empty]
     */

    constructor() { };

    /**
     * Set the application option type.
     * @param {number} type - The types are located in Discord Developer Portal, or import the global variable "CommandOptionType".
     * @public
     * @default 1
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type}
     */

    setOptionType(type) {
        if (!type) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'type');

        if (typeof type !== 'number') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'type', 'Number');

        this.type = type;
        return this;
    };

    /**
     * Set the application option name.
     * @public
     * @param {string} name - [None]
     */

    setName(name) {
        if (!name) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'name');

        if (typeof name !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'name', 'String');

        this.name = name;
        return this;
    };

    /**
     * Set the application option description.
     * @public
     * @param {string} description - [None]
     */

    setDescription(description) {
        if (!description) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'description');

        if (typeof description !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'description', 'String');

        this.description = description;
        return this;
    };

    /**
     * Set the application option options.
     * @public
     * @param {object} options - Add more options for Sub-commands and Sub-commands groups only.
     */

    setOptions(options) {
        if (!options) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'options');

        if (!Array.isArray(options)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'options', 'Array');

        this.options = options;
        return this;
    };

    /**
     * Set the application option choices.
     * @public
     * @param {Array} choices - An array of choices, only compatible with option type 3.
     */

    addChoices(choices) {
        if (!choices) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'choices');

        if (!Array.isArray(choices)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'choices', 'Array');;

        this.choices = choices;
        return this;
    };

    /**
     * Set the application option channels only.
     * @public
     * @param {Array} channels - An array of channel types, only compatible with option type 7.
     * @default All
     */

    setChannelTypes(channels) {
        if (!channels) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'channels');

        if (!Array.isArray(channels)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'channels', 'Array');

        this.channel_types = channels;
        return this;
    };

    /**
     * Set the application option required or not.
     * @public
     * @param {boolean} bool - [None]
     */

    setRequired(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.required = bool;
        return this;
    };

    /**
     * Set the application option autocomplete.
     * @public
     * @param {boolean} bool - [None]
     */

    setAutocomplete(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.autocomplete = bool;
        return this;
    };
};

module.exports = ApplicationCommandOptionsBuilder;