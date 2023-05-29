const { StringSelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const { createError } = require('../src/handlers/main');

module.exports = class SelectMenuPaginatorBuilder {
    constructor() { };

    setCollectorFilter(filter) {
        if (!filter) throw new createError(0, 'Received \'filter\' as an empty value.');

        this.colFilter = filter;
        return this;
    };

    setCollectorTime(time) {
        if (!time) throw new createError(0, 'Received \'time\' as an empty value.');

        if (typeof time !== 'number') throw new createError(2, '\'time\' is not a number.');

        this.colTime = time;
        return this;
    };

    setPlaceHolder(text) {
        if (!text) throw new createError(0, 'Received \'text\' as an empty value.');

        if (typeof text !== 'string') throw new createError(2, '\'text\' is not a string.');

        this.placeholder = text;
        return this;
    };

    setCustomId(customId) {
        if (!customId) throw new createError(0, 'Received \'customId\' as an empty value.');

        if (typeof customId !== 'string') throw new createError(2, '\'customId\' is not a string.');

        this.customId = customId;
        return this;
    };

    setComponents(components) {
        if (!components) throw new createError(0, 'Received \'component\' as an empty value.');

        if (!Array.isArray(components)) throw new createError(2, '\'component\' is not an array.');

        let arr = [];

        components.forEach((comp) => {
            if (typeof comp !== 'object') throw new createError(2, 'Received non object type from \'setComponents()#component\'');

            if (!comp.label || typeof comp.label !== 'string') throw new createError(0, 'Received an empty value from \'setComponents()#component#label\'.');

            if (!comp.embed && !comp.content) throw new createError(0, 'Received an empty value from \'setComponents()#component#content\' or \'setComponents()#component#embed\'.');

            if (comp.description && typeof comp.description !== 'string') throw new createError(0, 'Received non string type value from \'setComponents()#component#description\'.');

            if (comp.emoji && typeof comp.emoji !== 'string') throw new createError(0, 'Received non string type value from \'setComponents()#component#emoji\'.');

            arr.push({
                label: `${comp.label}`,
                value: `${comp.label.toLowerCase()}`,
                embed: comp.embed,
                description: comp.description || undefined,
                emoji: comp.emoji || undefined
            });
        });

        this.components = arr;
        return this;
    };

    setMainSender(content, embeds) {
        if (content && typeof content !== 'string') throw new createError(2, '\'content\' is not a string.');
        if (embeds && !Array.isArray(embeds)) throw new createError(2, '\'embeds\' is not an array.');

        this.mainSender = {
            content: content || null,
            embeds: embeds || []
        };
        return this;
    };

    setReplyToAuthor(bool) {
        if (!bool) throw new createError(0, 'Received \'bool\' as an empty value or "false".');

        if (typeof bool !== 'boolean') throw new createError(2, '\'bool\' is not a boolean.');

        this.reply = bool;
        return this;
    };

    setUpdateWhenCollected(bool) {
        if (!bool) throw new createError(0, 'Received \'bool\' as an empty value or "false".');

        if (typeof bool !== 'boolean') throw new createError(2, '\'bool\' is not a boolean.');

        this.update = bool;
        return this;
    };

    setDisableMenuWhenCollectorEnded(bool) {
        if (!bool) throw new createError(0, 'Received \'bool\' as an empty value or "false".');

        if (typeof bool !== 'boolean') throw new createError(2, '\'bool\' is not a boolean.');

        this.disable = bool;
        return this;
    };

    setMainSenderWhenCollectorEnded(content, embeds) {
        if (content && typeof content !== 'string') throw new createError(2, '\'content\' is not a string.');
        if (embeds && !Array.isArray(embeds)) throw new createError(2, '\'embeds\' is not an array.');

        this.mainSenderColEnd = {
            content: content || null,
            embeds: embeds || []
        };
        return this;
    };

    async sendSelectMenuPaginator(interaction) {
        if (!interaction) throw new createError(0, 'Received \'interaction\' as an empty value.');

        if (!this.components) if (!text) throw new createError(7, '\'setComponents()\' was not defined, causing to receive an empty data value.');

        if (!this.customId) if (!text) throw new createError(7, '\'setCustomId()\' was not defined, causing to receive an empty data value.');

        try {
            const menuComp = new StringSelectMenuBuilder()
                .setCustomId(`${this.customId}`)
                .setPlaceholder(`${this.placeholder || 'Nothing selected'}`)
                .addOptions(this.components.map((item) => {
                    return {
                        label: `${item.label}`,
                        value: `${item.value}`,
                        description: item.description !== undefined ? `${item.description}` : undefined,
                        emoji: item.emoji !== undefined ? `${item.emoji}` : undefined
                    }
                }));

            let message;

            if (this.reply && this.reply === true) {
                await interaction.reply({
                    content: this.mainSender.content || null,
                    embeds: this.mainSender.embeds || [],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                menuComp
                            )
                    ],
                    fetchReply: true
                }).then(async (data) => message = data);
            } else {
                await interaction.channel.send({
                    content: this.mainSender.content || null,
                    embeds: this.mainSender.embeds || [],
                    components: [
                        new ActionRowBuilder()
                            .addComponents(
                                menuComp
                            )
                    ],
                    fetchReply: true
                }).then(async (data) => message = data);
            };

            const collector = interaction.channel.createMessageComponentCollector({
                filter: this.colFilter || undefined,
                time: this.colTime || undefined
            });

            collector.on('collect', async (i) => {
                if (i.customId !== this.customId) return;

                const chosen = i.values[0];
                let embed;
                let content;

                this.components.forEach((item) => {
                    if (item.value !== chosen) return;

                    embed = item.embed || [];
                    content = item.content || null;
                });

                console.log(embed, content)

                if (this.update === true) {
                    i.update({
                        content: content,
                        embeds: [
                            embed
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    menuComp
                                )
                        ]
                    });
                } else {
                    i.reply({
                        content: content,
                        embeds: [
                            embed
                        ],
                        ephemeral: true
                    });
                };
            });

            collector.on('end', async () => {
                if (this.disable && this.disable === true) {
                    message.edit({
                        content: this.mainSenderColEnd.content || null,
                        embeds: this.mainSenderColEnd.embeds || [],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    menuComp.setDisabled(true)
                                )
                        ]
                    });
                };
            });
        } catch (err) {
            throw new Error(err)
        };
    };
};