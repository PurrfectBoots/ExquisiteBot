const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');
const { EventEmitter } = require('node:events');

class BoostDetector extends EventEmitter {
    /**
     * The BoostDetector constructor parameters.
     * @param {object} client - The client.
     * @public
     */

    constructor(client) {
        if (!client) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'client');

        super();

        try {
            client.on('guildMemberUpdate', async (oldMember, newMember) => {
                if (oldMember.premiumSinceTimestamp != newMember.premiumSinceTimestamp) {
                    return this.emit('boostCreate', newMember);
                };

                if (newMember.premiumSinceTimestamp != oldMember.premiumSinceTimestamp) {
                    return this.emit('boostRemove', newMember);
                };
            });
        } catch (err) {
            new DJSError(DJSErrorCodes.EventEmitterFailed, 'BoostDetector');

            return console.log(err)
        };
    };
};

module.exports = BoostDetector;