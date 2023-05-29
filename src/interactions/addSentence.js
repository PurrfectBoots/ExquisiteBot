const { TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalBuilder } = require("discord.js");

module.exports = {
    customId: 'addSentence',
    run: async (client, interaction) => {
        
        const modal = new ModalBuilder()
        .setTitle("Ajout d'une phrase")
        .setCustomId("addSentenceModal")

        const textInput = new TextInputBuilder()
        .setLabel("Une phrase à ajouter")
        .setStyle(TextInputStyle.Short)
        .setCustomId("addSentenceTextInput")

        const row = new ActionRowBuilder().addComponents(textInput)

        modal.addComponents(row)

        return await interaction.showModal(modal)
    }
};