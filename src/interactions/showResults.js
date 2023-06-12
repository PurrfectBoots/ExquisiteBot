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

    let story = [];
    let currentBlock = [];
    currentLength = 0;
    for (const sentence of exquisiteGame.sentences) {
      if (currentLength + sentence.value.length > 4000) {
        story.push(currentBlock);
        currentLength = 0;
        currentBlock = [];
      } else {
        currentBlock.push(sentence.value);
        currentLength += sentence.value.length;
      }
    }
    if (currentBlock != []) {
      story.push(currentBlock);
    }

    let storyEmbeds = [];

    for (const block of story) {
      resumeEmbed = new EmbedBuilder().setDescription(block.join("\n")).setColor("#39425c");

      storyEmbeds.push(resumeEmbed);
    }

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

    return await pagination({
      embeds: [
        ...storyEmbeds,
        ...leaderboardContributorsEmbeds,
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
