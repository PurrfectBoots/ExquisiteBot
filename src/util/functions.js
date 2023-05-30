const { EmbedBuilder } = require("discord.js");

module.exports = (client) => {
  client.getStatusMessage = async (nextupdate) => {
    nextupdate;
    description = [];
    description.push(`:heartbeat: Latence moyenne de l'API Discord: **${client.ws.ping}** ms`);
    // description.push(`:satellite: Latence de la base de données: **${client.data.latencies.database}** ms`);
    description.push(`:clock3: Dernier démarrage <t:${((Date.now() - client.uptime) / 1000).toFixed(0)}:R>`);
    nextupdate ? description.push(`:hourglass_flowing_sand: Prochaine mise à jour <t:${((Date.now() + nextupdate) / 1000).toFixed(0)}:R>`) : void 0;

    const statusEmbed = new EmbedBuilder()
      .setDescription(description.join("\n\n"))

      .setColor("Blue");

    return statusEmbed;
  };
};
