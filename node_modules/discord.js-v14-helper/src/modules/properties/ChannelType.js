/**
 * All the Discord channel types.
 * @type {object}
 * @returns {number}
 * @const
 */

const ChannelType = {
    Text: 0,
    DM: 1,
    Voice: 2,
    Group_DM: 3,
    Category: 4,
    Announcement: 5,
    Announcement_thread: 10,
    Thread_public: 11,
    Thread_private: 12,
    Stage: 13,
    Directory: 14,
    Forum: 15
};

module.exports = ChannelType;