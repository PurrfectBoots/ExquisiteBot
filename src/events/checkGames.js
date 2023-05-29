const client = require("../index");
const config = require("../config/main");
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const ExquisiteGame = require("../schemas/exquisiteGame");

client.on("checkGames", async () => {
  try {
    const endedGames = await ExquisiteGame.where("endDate").lt(Date.now()).where("active").equals(true);
    if (endedGames.length > 0) {
      await ExquisiteGame.where("endDate").lt(Date.now()).where("active").equals(true).updateMany({ active: false });

      endedGames.map(async (game) => {
        let contributors = [];
        game.sentences.map((sentence) => {
          if (contributors.some((contributor) => contributor.id == sentence.authorID)) {
            let contributor = contributors.find((contributor) => contributor.id == sentence.authorID);
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
          .addFields({ name: "Participants", value: `${contributors.length}`, inline: true }, { name: "Phrases ajoutées", value: `${game.sentences.length}`, inline: true });

        const showResults = new ButtonBuilder({
          style: ButtonStyle.Primary,
          customId: "showResults",
          label: "Consulter les résultats",
        });

        const row = new ActionRowBuilder().addComponents(showResults);

        message.edit({
          embeds: [endedEmbed],
          components: [row],
        });
      });
    }
  } catch (error) {
    console.log(error);
  }
});
