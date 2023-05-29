const { REST, Routes } = require('discord.js');
const ms = require('ms');
const { DJSError, DJSErrorCodes, DJSMsgLogger } = require('../../handlers/errors/index');

/**
* A class that lets you to register application commands on Discord easily.
*/

class ApplicationCommandsRegister {
    /**
     * Register automatically application commands in-guild or in all guilds.
     * @param {string} clientToken - The bot token.
     * @param {string} clientId - The bot ID.
     * @public
     */

    constructor(clientToken, clientId) {
        if (!clientToken) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'type');
        if (!clientId) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'type');

        if (typeof clientToken !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'type');
        if (typeof clientId !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'type');

        this.token = clientToken;
        this.id = clientId;
    };

    /**
     * Set the application commands to register.
     * @param {Array} commands - The application commands, must be in an array.
     * @public
     */

    setApplicationCommands(commands) {
        if (!commands) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'commands');

        if (!Array.isArray(commands)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'commands', 'Array');

        this.commands = commands;
        return this;
    };

    /**
     * Set the REST version.
     * @param {number} version - The REST version that you want to set.
     * @public
     * @default 10
     */

    setRestVersion(version) {
        if (!version) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'version');

        if (typeof version !== 'number') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'version', 'Number');

        this.version = version;
        return this;
    };

    /**
     * Set the application commands in one guild.
     * @param {string} guild - The guild ID to register the application commands.
     * @public
     */

    setRegisterInOneGuild(guild) {
        if (!guild) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'guild');

        if (typeof guild !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'guild', 'String');

        this.guild = guild;
        return this;
    };

    /**
     * Starts to register the application commands.
     * @returns {Promise}
     * @public
     * @async
     */

    async start() {
        if (!this.commands) throw new DJSError(DJSErrorCodes.MissingRequiredMethod, 'setApplicationCommands()');

        DJSMsgLogger('Started registering application commands...');

        return new Promise(async (resolved, rejected) => {
            try {
                const timeStart = new Date().getTime();

                const rest = new REST({
                    version: `${this.version || 10}`
                }).setToken(this.token);

                if (this.guild) {
                    await rest.put(
                        Routes.applicationGuildCommands(this.id, this.guild), {
                            body: this.commands
                        }
                    );
                } else {
                    await rest.put(
                        Routes.applicationCommands(this.id),
                        { body: this.commands }
                    );
                };

                const timeNow = new Date().getTime();
                const total = ms((timeNow - timeStart), { long: true });

                DJSMsgLogger(`Successfully registered application commands.\n> Took to register app commands: ${total}`);

                resolved({
                    returned: 1,
                    data: {
                        commands: this.commands,
                        token: this.token,
                        id: this.id,
                        guild: this.guild || null,
                        time: (timeNow - timeStart) || undefined,
                        rest_version: this.version || 10
                    },
                    errors: null
                });
            } catch (err) {
                DJSMsgLogger('Couldn\'t register application commands.');

                rejected({
                    returned: 0,
                    data: {
                        commands: this.commands,
                        token: this.token,
                        id: this.id,
                        guild: this.guild || null,
                        time: undefined,
                        rest_version: this.version || 10
                    },
                    errors: err
                });
            };
        });

    };
};

module.exports = ApplicationCommandsRegister;