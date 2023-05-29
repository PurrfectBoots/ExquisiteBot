const { TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder } = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "showLastSentence",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });
    const lastSentence = exquisiteGame.sentences[exquisiteGame.sentences.length - 1].value;

    interaction.reply({
      content: `La dernière phrase ajoutée est\n||*\`${lastSentence}\`*||`,
      ephemeral: true,
    });
  },
};
