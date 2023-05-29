const { GatewayIntentBits, Partials } = require("discord.js");
const { ClientIntents, ClientPartials } = require("discord.js-v14-helper");
require("dotenv").config();

module.exports = {
  // Client configuration:
  client: {
    constructor: {
      intents: ClientIntents,
      partials: ClientPartials,
      presence: {
        activities: [],
        status: "online",
      },
    },
    token: process.env.TOKEN,
    id: process.env.CLIENTID,
  },

  // Database:
  database: {
    mongodb_uri: process.env.MONGODB_URI,
  },
};
