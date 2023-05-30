const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "endExquisite",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });

    if (exquisiteGame.authorID != interaction.user.id) {
      return interaction.reply({
        content: "`🚫` Seul le propriétaire du cadavre exquis peut y mettre fin",
        ephemeral: true,
      });
    }

    let contributors = [];
    exquisiteGame.sentences.map((sentence) => {
      if (contributors.some((contributor) => contributor.id == sentence.authorID)) {
        let contributor = contributors.find((contributor) => contributor.id == sentence.authorID);
        contributor.amount++;
      } else {
        contributors.push({ id: sentence.authorID, amount: 1 });
      }
    });

    contributors.sort((a, b) => b.count - a.count);

    const endedEmbed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Cadavre exquis terminé !")
      .setFooter({ text: `ID: ${exquisiteId}` })
      .setColor("#34eb58")
      .addFields({ name: "Participants", value: `${exquisiteGame.contributors.length}`, inline: true }, { name: "Phrases ajoutées", value: `${exquisiteGame.sentences.length}`, inline: true });

    const showResults = new ButtonBuilder({
      style: ButtonStyle.Primary,
      customId: "showResults",
      label: "Consulter les résultats",
    });

    const row = new ActionRowBuilder().addComponents(showResults);

    interaction.message.edit({
      embeds: [endedEmbed],
      components: [row],
    });

    return interaction.reply({
      content: "`✅` Cadavre exquis achevé avec succès !",
      ephemeral: true,
    });
  },
};
