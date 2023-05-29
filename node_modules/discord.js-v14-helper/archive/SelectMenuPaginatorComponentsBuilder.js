const { createError } = require('../src/handlers/main');

module.exports = class SelectMenuPaginatorComponentsBuilder {
    constructor() { };

    setLabel(label) {
        if (!label) throw new createError(0, 'Received \'label\' as an empty value.');

        if (typeof label !== 'string') throw new createError(2, '\'label\' is not a number.');

        this.label = label;
        return this;
    };

    setEmbed(embed) {
        if (!embed) throw new createError(0, 'Received \'embed\' as an empty value.');

        this.embed = embed;
        return this;
    };

    setContent(content) {
        //if (!content) throw new createError(0, 'Received \'content\' as an empty value.');

        if (content !== null) {
            if (typeof content !== 'string') throw new createError(2, '\'content\' is not a number.');
        };

        this.content = content;
        return this;
    };

    setDescription(description) {
        if (!description) throw new createError(0, 'Received \'description\' as an empty value.');

        if (typeof description !== 'string') throw new createError(2, '\'description\' is not a number.');

        this.description = description;
        return this;
    };

    setEmoji(emoji) {
        if (!emoji) throw new createError(0, 'Received \'emoji\' as an empty value.');

        if (typeof emoji !== 'string') throw new createError(2, '\'emoji\' is not a number.');

        this.emoji = emoji;
        return this;
    };
};