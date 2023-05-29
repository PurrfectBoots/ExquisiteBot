const { Partials } = require('discord.js');

/**
 * Returns all Partials from discord.js.
 * @type {Array}
 * @returns {number}
 * @const
 */

const ClientPartials = [];

Object.keys(Partials).forEach((key) => {
    if (typeof Partials[key] !== 'number') return;

    ClientPartials.push(Partials[key]);
});

module.exports = ClientPartials;