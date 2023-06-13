const client = require("../index");
const config = require("../config/main");
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

client.on("checkGames", async () => {
  try {
    const endedGames = await ExquisiteGame.where("endDate")
      .lt(Date.now())
      .where("active")
      .equals(true);
    if (endedGames.length > 0) {
      await ExquisiteGame.where("endDate")
        .lt(Date.now())
        .where("active")
        .equals(true)
        .updateMany({ active: false });

      endedGames.map(async (game) => {
        let contributors = [];
        game.sentences.map((sentence) => {
          if (
            contributors.some(
              (contributor) => contributor.id == sentence.authorID
            )
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

        const channel = await client.channels.fetch(game.channelID);
        const message = await channel.messages.fetch(game.embedID);
        const mainEmbed = message.embeds[0];

        const endedEmbed = new EmbedBuilder()
          .setAuthor(mainEmbed.author)
          .setTitle("Cadavre exquis terminé !")
          .setFooter(mainEmbed.footer)
          .setColor("#34eb58")
          .addFields(
            {
              name: "Participants",
              value: `${contributors.length}`,
              inline: true,
            },
            {
              name: "Phrases ajoutées",
              value: `${game.sentences.length}`,
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

        message.edit({
          embeds: [endedEmbed],
          components: [row],
        });
      });
    }
    const unsavedGamesExpired = await ExquisiteGame.where("saved")
      .equals(false)
      .where("enDate")
      .lt(Date.now() - 3600 * 24 * 1000);
    if (unsavedGamesExpired.length > 0) {
      unsavedGamesExpired.map(async (game) => {
        const gameChannel = await client.channels.fetch(game.channelID);
        const gameMessage = await gameChannel.messages.fetch(game.embedID);
        const gameEmbed = gameMessage.embeds[0];

        const deletedGameEmbed = new EmbedBuilder(gameEmbed.toJSON())
          .setColor("Grey")
          .setDescription(
            "`🚫` Cette partie est terminée et n'a pas été sauvegardée, l'histoire n'est donc plus disponible"
          );

        await gameMessage.edit({
          embeds: [deletedGameEmbed],
          components: [],
        });

        await game.deleteMany({
          saved: false,
          endDate: { $lt: Date.now() - 3600 * 24 * 1000 },
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
