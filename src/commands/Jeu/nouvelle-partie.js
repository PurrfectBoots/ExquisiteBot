const { ApplicationCommandOptionType, ChannelType, ButtonBuilder, EmbedBuilder, ButtonStyle, ComponentType, ActionRowBuilder } = require("discord.js");
const ms = require("ms");
const uniqid = require("uniqid");
const ExquisiteGame = require("../../schemas/exquisiteGame");

module.exports = {
  command_data: {
    name: "nouvelle-partie",
    description: "Commence une nouvelle partie !",
    type: 1,
    options: [
      {
        type: ApplicationCommandOptionType.Channel,
        name: "salon",
        description: "Où ça ?",
        required: true,
        channel_types: [ChannelType.GuildText],
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "durée",
        description: "Pendant combien de temps ? (utilise le format Xd Xh Xm Xs, 0 pour infini)",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.String,
        name: "introduction",
        description: "C'est à toi de choisir la première phrase !",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Boolean,
        name: "participation-unique",
        description: "Activer pour autoriser une seule phrase par joueur",
        required: true,
      },
    ],
  },
  role_perms: null,
  developers_only: false,
  cooldown: "1m",
  category: "Jeu",
  run: async (client, interaction) => {
    await interaction.deferReply({ ephemeral: true });

    const introduction = interaction.options.get("introduction").value;
    if (introduction.length > 1000) {
      return interaction.editReply({
        content: `\`🚫\` Il est impossible d'ajouter une phrase de plus de 1000 caractères !`,
        ephemeral: true,
      });
    }

    exquisID = uniqid();
    if (ms(interaction.options.get("durée").value) == undefined) {
      return interaction.editReply({
        content: `\`🚫\` La durée doit être indiquée sous le format \`3h\` !`,
        ephemeral: true,
      });
    }

    length = ms(interaction.options.get("durée").value);

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTitle("Cadavre exquis")
      .setDescription("`🎫` Ajoutez vos phrases avant la fin du temps imparti !\n" + `${length != 0 ? `\`⏱️\` Se termine <t:${((Date.now() + length) / 1000).toFixed(0)}:R>\n` : ""}` + `${interaction.options.get("participation-unique").value ? "`👤` Participation unique" : "`👥` Participations illimitées"}`)
      .setFooter({ text: `ID: ${exquisID}` })
      .setColor("#ff0095")
      .addFields({ name: "Participants", value: "1", inline: true }, { name: "Phrases ajoutées", value: "1", inline: true });

    const showLastSentence = new ButtonBuilder({
      custom_id: "showLastSentence",
      style: ButtonStyle.Secondary,
      label: "Regarder la dernière phrase ajoutée",
    });
    const addSentence = new ButtonBuilder({
      custom_id: "addSentence",
      style: ButtonStyle.Primary,
      label: "Ajouter une phrase",
    });
    const end = new ButtonBuilder({
      custom_id: "endExquisite",
      style: ButtonStyle.Danger,
      label: "Terminer le cadavre exquis",
    });
    const row = new ActionRowBuilder().addComponents(showLastSentence, addSentence, end);

    const exquisiteChannel = await interaction.guild.channels.fetch(interaction.options.get("salon").value);

    exquisiteChannel
      .send({
        content: "",
        embeds: [embed],
        components: [row],
      })
      .then(async (e) => {
        //mongoDB
        const exquisiteGame = await ExquisiteGame.create({
          gameID: exquisID,
          authorID: interaction.user.id,
          sentences: [{ authorID: interaction.user.id, value: introduction }],
          embedID: e.id,
          channelID: e.channel.id,
          oneTimePlay: interaction.options.get("participation-unique").value,
          endDate: length == 0 ? Infinity : Date.now() + length,
          active: true,
        });
        await exquisiteGame.save();
      });

    return interaction.editReply({
      content: `\`✅\` Le cadavre exquis a commencé juste ici <#${exquisiteChannel.id}>${length == 0 ? "" : ` et se termine <t:${((Date.now() + length) / 1000).toFixed(0)}:R>`}`,
    });
  },
};
