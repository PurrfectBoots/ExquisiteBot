const { DJSError, DJSErrorCodes } = require('../../handlers/errors/index');

/**
* A cool class that lets you to make your Discord bot to have presence easily, with a random activity name & type.
*/

class ClientPresenceBuilder {
    /**
     * Choose a random activity name and sets it as the client presence.
     * @param {object} client - The client.
     * @public
     */

    constructor(client) {
        if (!client) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'client');

        this.client = client;
    };

    /**
     * List of the activity names.
     * @param {Array<string>} msgs - The activity names. 
     * @public
     */

    setActivityNames(msgs) {
        if (!msgs) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'msgs');

        if (!Array.isArray(msgs)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'msgs', 'Array');

        this.activityNames = msgs;
        return this;
    };

    /**
     * List of the activity types.
     * @param {Array<number>} types - The types for each activity name. Ex: The random activity type is going to be the index of chosen activity name.
     * @public
     */

    setActivityTypes(types) {
        if (!types) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'types');

        if (!Array.isArray(types)) throw new DJSError(DJSErrorCodes.InvalidParameterType, 'types', 'Array');

        this.activityTypes = types;
        return this;
    };

    /**
     * The client\'s default status, non changeable.
     * @param {string} status - Could be: 'online', 'invisible', 'dnd', or 'idle'.
     * @public
     */

    setStatus(status) {
        if (!status) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'status');

        if (typeof status !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'status', 'String');

        this.status = status;
        return this;
    };

    /**
     * Required function for activity type number 1 ('Streaming')
     * @param {string} url - The twitch channel URL, you can use this: "https://twitch.tv/discord".
     * @public
     */

    setTwitchURL(url) {
        if (!url) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'url');

        if (typeof url !== 'string') throw new DJSError(DJSErrorCodes.InvalidParameterType, 'url', 'String');

        this.url = url;
        return this;
    };

    /**
     * Sets a random activity name & type to the client.
     * @returns {Promise}
     * @public
     * @async
     */

    async start() {
        if (this.activityTypes.length !== this.activityNames.length) throw new DJSError(DJSErrorCodes.InvalidArrayLength, 'this.activityTypes', 'this.activityNames');

        const activityName = this.activityNames[Math.floor((Math.random() * this.activityNames.length))];

        const activityType = this.activityTypes[this.activityNames.indexOf(activityName)] || 0;

        return new Promise((resolved, rejected) => {
            try {
                this.client.user.setPresence({
                    status: this.status || 'online',
                    activities: [{
                        name: activityName,
                        type: activityType,
                        url: this.url || null
                    }]
                });

                resolved({
                    returned: 1,
                    data: {
                        activities: this.activityNames,
                        types: this.activityTypes,
                        status: this.status,
                        twitch_url: this.url || null,
                        activity_chosen: {
                            element: activityName,
                            index: this.activityNames.indexOf(activityName) || -1
                        },
                        type_chosen: {
                            element: activityType,
                            index: this.activityTypes.indexOf(activityType) || -1
                        }
                    },
                    errors: null
                });
            } catch (err) {
                DJSMsgLogger('Couldn\'t set client presence.');

                rejected({
                    returned: 0,
                    data: {
                        activities: this.activityNames,
                        types: this.activityTypes,
                        activity_chosen: {
                            element: activityName,
                            index: this.activityNames.findIndex(activityName) || undefined
                        },
                        type_chosen: {
                            element: activityType,
                            index: this.activityTypes.findIndex(activityName) || undefined
                        }
                    },
                    errors: err
                });
            };
        });
    };
};

module.exports = ClientPresenceBuilder;