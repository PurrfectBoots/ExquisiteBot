const ExquisiteGame = require("../schemas/exquisiteGame");
const { EmbedBuilder, ActionRowBuilder } = require("discord.js");

module.exports = {
  customId: "saveGame",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOneAndUpdate(
      { gameID: exquisiteId },
      { saved: true }
    );

    const channel = await client.channels.fetch(exquisiteGame.channelID);
    const message = await channel.messages.fetch(exquisiteGame.embedID);
    const endedEmbed = new EmbedBuilder(
      message.embeds[0].toJSON()
    ).setDescription("`💾` Partie sauvegardée !");

    const row = new ActionRowBuilder().addComponents(
      message.components[0].components[0]
    );

    await message.edit({
      embeds: [endedEmbed],
      components: [row],
    });

    interaction.reply({
      content: "`💾` La partie a été sauvegardée !",
      ephemeral: true,
    });
  },
};
