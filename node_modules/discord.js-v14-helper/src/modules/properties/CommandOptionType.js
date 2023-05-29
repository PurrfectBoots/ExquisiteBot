/**
 * All the Discord command option types.
 * @type {object}
 * @returns {number}
 * @const
 */

const CommandOptionType = {
    Sub_command: 1,
    Sub_command_group: 2,
    String: 3,
    Integer: 4,
    Boolean: 5,
    User: 6,
    Channel: 7,
    Role: 8,
    Mentionable: 9,
    Number: 10,
    Attachment: 11
};

module.exports = CommandOptionType;