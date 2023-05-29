const { ButtonBuilder, ButtonStyle, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const { pagination, ButtonTypes, ButtonStyles } = require("@devraelfreeze/discordjs-pagination");
const ExquisiteGame = require("../schemas/exquisiteGame");

module.exports = {
  customId: "showResults",
  run: async (client, interaction) => {
    const exquisiteId = interaction.message.embeds[0].footer.text.split(" ")[1];
    const exquisiteGame = await ExquisiteGame.findOne({ gameID: exquisiteId });

    let story = [];
    let currentBlock = [];
    currentLength = 0;
    for (const sentence of exquisiteGame.sentences) {
      if (currentLength + sentence.value.length > 5000) {
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
      if (contributors.some((contributor) => contributor.id == sentence.authorID)) {
        let contributor = contributors.find((contributor) => contributor.id == sentence.authorID);
        contributor.amount++;
      } else {
        contributors.push({ id: sentence.authorID, amount: 1 });
      }
    });

    let topContributors = [...contributors];
    topContributors.sort((a, b) => a.amount - b.amount);

    const contributorsEmbed = new EmbedBuilder().setTitle("Joueurs").setDescription(topContributors.map((contributor) => "<@" + contributor.id + ">").join(", "));

    const factsEmbed = new EmbedBuilder().setDescription(`Meilleur contributeur: <@${topContributors[0].id}> a ajouté ${topContributors[0].amount} phrase` + `${topContributors[0].amount > 1 ? `s` : ``}`);

    return await pagination({
      embeds: [...storyEmbeds, contributorsEmbed, factsEmbed],
      author: interaction.member.user,
      interaction: interaction,
      ephemeral: true,
      time: 300000,
      disableButtons: false,
      fastSkip: false,
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
