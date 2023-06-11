const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require("discord.js");
const {
  pagination,
  ButtonTypes,
  ButtonStyles,
} = require("@devraelfreeze/discordjs-pagination");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "showResults",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });

    if (exquisiteGame == null) {
      return interaction.reply({
        content:
          "`❗` La partie n'a pas pu être trouvée ou n'a pas été sauvegardée !",
        ephemeral: true,
      });
    }

    let story = exquisiteGame.sentences.reduce((acc, sentence) => {
      const lastBlock = acc[acc.length - 1];
      const length = lastBlock ? lastBlock.length : 0;
      if (length + sentence.value.length > 4000) {
        acc.push([sentence.value]);
      } else {
        lastBlock.push(sentence.value);
      }
      return acc;
    }, [[]]);

    let storyEmbeds = await Promise.all(story.map(async (block) => {
      const resumeEmbed = new EmbedBuilder()
        .setDescription(block.join("\n"))
        .setColor("#39425c");
      return resumeEmbed;
    }));

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

    let topContributors = [...contributors];
    topContributors.sort((a, b) => b.amount - a.amount);

    const defaultContributorsLeaderboardPageEmbed = new EmbedBuilder().setTitle(
      "`🏆` Classement"
    );
    let contributorsLeaderboardPageEmbed = new EmbedBuilder(
      defaultContributorsLeaderboardPageEmbed.toJSON()
    );
    let leaderboardContributorsEmbeds = [];
    let contributorsLeaderboardPage = "";
    topContributors.map((contributor, rank) => {
      if ((rank + 1) % 10 === 0) {
        leaderboardContributorsEmbeds.push(
          contributorsLeaderboardPageEmbed.setDescription(
            contributorsLeaderboardPage
          )
        );
        contributorsLeaderboardPage = "";
      } else {
        contributorsLeaderboardPage += `${rank + 1}. <@${contributor.id}> - **${
          contributor.amount
        }pts**\n`;
      }
    });
    leaderboardContributorsEmbeds.push(
      contributorsLeaderboardPageEmbed.setDescription(
        contributorsLeaderboardPage
      )
    );

    const contributorsEmbed = new EmbedBuilder()
      .setTitle("Joueurs")
      .setDescription(
        topContributors
          .map((contributor) => "<@" + contributor.id + ">")
          .join(", ")
      );

    const factsEmbed = new EmbedBuilder().setDescription(
      `Meilleur contributeur: <@${topContributors[0].id}> a ajouté ${topContributors[0].amount} phrase` +
        `${topContributors[0].amount > 1 ? `s` : ``}`
    );

    return await pagination({
      embeds: [
        ...storyEmbeds,
        contributorsEmbed,
        ...leaderboardContributorsEmbeds,
        factsEmbed,
      ],
      author: interaction.member.user,
      interaction: interaction,
      ephemeral: true,
      time: 300000,
      disableButtons: false,
      fastSkip: true,
      pageTravel: false,
      buttons: [
        {
          type: ButtonTypes.previous,
          label: "Page précédente",
          style: ButtonStyles.Primary,
        },
        {
          type: ButtonTypes.next,
          label: "Page suivante",
          style: ButtonStyles.Primary,
        },
      ],
    });
  },
};
