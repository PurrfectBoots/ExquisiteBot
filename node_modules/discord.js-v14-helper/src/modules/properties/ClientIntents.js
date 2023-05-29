const { GatewayIntentBits } = require('discord.js');

/**
 * Returns all Gateaway intent bits from discord.js.
 * @type {Array}
 * @returns {number}
 * @const
 */

const ClientIntents = [];

Object.keys(GatewayIntentBits).forEach((key) => {
    if (typeof GatewayIntentBits[key] !== 'number') return;

    ClientIntents.push(GatewayIntentBits[key]);
});

module.exports = ClientIntents;