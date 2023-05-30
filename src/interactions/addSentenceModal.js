const { EmbedBuilder } = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "addSentenceModal",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const sentence = interaction.fields.fields.get("addSentenceTextInput").value;
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });

    if (sentence.length > 1000) {
      return interaction.reply({
        content: `\`🚫\` Il est impossible d'ajouter une phrase de plus de 1000 caractères !`,
        ephemeral: true,
      });
    }

    if (exquisiteGame.oneTimePlay && exquisiteGame.sentences.some((sentence) => sentence.authorID == interaction.user.id)) {
      return interaction.reply({
        content: `\`🚫\` Tu as déjà participé !`,
        ephemeral: true,
      });
    }

    exquisiteGame.sentences.push({ authorID: interaction.user.id, value: sentence });
    exquisiteGame.save();

    let contributors = [];
    exquisiteGame.sentences.map((sentence) => {
      if (!contributors.includes(sentence.authorID)) {
        contributors.push(sentence.authorID);
      }
    });

    const previousEmbed = interaction.message.embeds[0];

    const mainEmbed = new EmbedBuilder()
      .setAuthor(previousEmbed.author)
      .setTitle(previousEmbed.title)
      .setDescription(previousEmbed.description)
      .setFooter(previousEmbed.footer)
      .setColor(previousEmbed.color)
      .addFields({ name: "Participants", value: `${contributors.length}`, inline: true }, { name: "Phrases ajoutées", value: `${exquisiteGame.sentences.length}`, inline: true });

    interaction.message.edit({
      embeds: [mainEmbed],
    });

    const embed = new EmbedBuilder()
      .setTitle(`\`✅\` Phrase ajoutée au cadavre exquis!`)
      .setDescription(`Ta phrase: ||*\`${sentence}\`*||`)
      .setFooter({ text: `ID: ${exquisiteId}` })
      .setColor("#03a9fc");

    return interaction.reply({
      content: "",
      ephemeral: true,
      embeds: [embed],
    });
  },
};
