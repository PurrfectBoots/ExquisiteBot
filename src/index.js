const { Client, Collection } = require("discord.js");
const { Colors, BetterConsoleLogger } = require("discord.js-v14-helper");
const fs = require("fs");
const config = require("./config/main");
const https = require("https");
const express = require("express");
const app = express();

app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  https.get(`https://discaventures-keepalive-40yd.onrender.com`);
}, 60000);

process.on("SIGTERM", () => {
  console.log("Received SIGTERM. Exiting...");
  process.exit(0);
});

const client = new Client(config.client.constructor);

client.commands = new Collection();
client.interactions = new Collection();

module.exports = client;

fs.readdirSync("./src/handlers").forEach((handler) => {
  new BetterConsoleLogger("[INFO] Handler loaded: " + handler).setTextColor(Colors.Bright_yellow).log(true);

  require("./handlers/" + handler)(client, config);
});

require("./error/main")();

client.login(config.client.token);
