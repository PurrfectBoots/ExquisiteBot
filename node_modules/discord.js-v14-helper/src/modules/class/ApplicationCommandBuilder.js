const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
 * Creates a new application command.
 * @class ApplicationCommandBuilder
 */

class ApplicationCommandBuilder {
    /**
     * The ApplicationCommandBuilder constructor parameters. [Empty]
     */

    constructor() { };

    /**
     * Set the application command type.
     * @param {number} type - The types are located in Discord Developer Portal, or import the global variable "CommandType".
     * @public
     * @default 1
     * @see {@link https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-types}
     */

    setCommandType(type) {
        if (!type) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'type');

        if (typeof type !== 'number') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'type', 'String');

        this.type = type;
        return this;
    };

    /**
     * Set the application command name.
     * @param {string} name - [None]
     * @public
     */

    setName(name) {
        if (!name) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'name');

        if (typeof name !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'name', 'String');

        this.name = name;
        return this;
    };

    /**
     * Set the application command type.
     * @param {string} description - Not required for application command types User (2) and Message (3).
     * @public
     */

    setDescription(description) {
        if (!description) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'description');

        if (typeof description !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'description', 'String');

        if (this.type === 2 | this.type === 3) throw new DJSError(DJSErrorCodes.CustomErrorReason, 'Not required to provide an application command description while the provided type is 2 or 3.');

        this.description = description;
        return this;
    };

    /**
     * Set the application command options.
     * @param {Array} options - Create options by importing "ApplicationCommandOptionsBuilder", also not required for application command types User (2) and Message (3).
     * @public
     * @default []
     */

    setOptions(options) {
        if (!options) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'options');

        if (!Array.isArray(options)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'options', 'Array');

        if (this.type === 2 | this.type === 3) throw new DJSError(DJSErrorCodes.CustomErrorReason, 'Not required to provide an application command options while the provided type is 2 or 3.');

        this.options = options;
        return this;
    };

    /**
     * Set the application command default permission.
     * @param {boolean} bool - Could be 'true' or 'false'.
     * @public
     * @deprecated Deprecated by Discord API, avoid from using it.
     */

    setDefaultPermission(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.default_permission = bool;
        return this;
    };

    /**
     * Set the application command guild member permissions.
     * @param {string} permission - The permissions bit field from discord.js.
     * @public
     */

    setDefaultGuildMemberPermissions(permission) {
        if (!permission) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'permission', true);

        if (typeof permission !== 'bigint') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'permission', 'Bigint');

        this.default_member_permissions = PermissionsBitField.resolve(permission).toString();
        return this;
    };

    /**
     * Set the application command DM permissions.
     * @param {boolean} bool - Could be 'true' or 'false'.
     * @public
     * @default false
     */

    setDirectMessagesPermissions(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.dm_permission = bool;
        return this;
    };

    /**
     * Set the application command for users that are 18+ years old or NSFW only channels.
     * @param {boolean} bool - Could be 'true' or 'false'.
     * @public
     * @default false
     */

    setNSFW(bool) {
        if (!bool) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'bool', true);

        if (typeof bool !== 'boolean') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'bool', 'Boolean');

        this.nsfw = bool;
        return this;
    };
};

module.exports = ApplicationCommandBuilder;