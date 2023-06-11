const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "endExquisite",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });

    if (exquisiteGame.authorID != interaction.user.id) {
      return interaction.reply({
        content:
          "`🚫` Seul le propriétaire du cadavre exquis peut y mettre fin",
        ephemeral: true,
      });
    }

    await exquisiteGame.updateOne({ endDate: Date.now() })

    let contributors = [];
    exquisiteGame.sentences.map((sentence) => {
      if (
        contributors.some((contributor) => contributor.id == sentence.authorID)
      ) {
        let contributor = contributors.find(
          (contributor) => contributor.id == sentence.authorID
        );
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
      .addFields(
        { name: "Participants", value: `${contributors.length}`, inline: true },
        {
          name: "Phrases ajoutées",
          value: `${exquisiteGame.sentences.length}`,
          inline: true,
        }
      )
      .setDescription(
        `\`❗\` Attention, la partie n'a pas été sauvegardée et le contenu ne sera plus disponnible <t:${(
          Date.now() / 1000 +
          24 * 3600
        ).toFixed(0)}:R>`
      );

    const showResults = new ButtonBuilder({
      style: ButtonStyle.Primary,
      customId: "showResults",
      label: "Consulter les résultats",
    });
    const saveGame = new ButtonBuilder({
      style: ButtonStyle.Success,
      customId: "saveGame",
      label: "Sauvegarder la partie",
      emoji: "💾",
    });

    const row = new ActionRowBuilder().addComponents(showResults, saveGame);

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
