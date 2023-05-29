const { DJSError, DJSErrorCodes, DJSMsgLogger } = require('../../handlers/errors/index');
const mongoose = require('mongoose');

/**
 * The simple and best way to connect MongoDB easily.
 * @requires mongoose
 * @public
 */

class MongoDBConnector {
    /**
     * Connects to a cluster.
     * @param {string} uri - The MongoDB cluster.
     * @public
     */

    constructor(uri) {
        if (!uri) throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'uri');

        if (typeof uri !== 'string') throw new DJSError(DJSErrorCodes.EmptyParameterReceived, 'uri', 'String');

        this.uri = uri;
    };

    /**
     * Starts connecting to MongoDB.
     * @returns {Promise}
     * @public
     * @async
     */

    async start() {
        return new Promise(async (resolved, rejected) => {
            try {
                DJSMsgLogger('Started connecting to MongoDB...');

                mongoose.set('strictQuery', true);

                await mongoose.connect(this.uri, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                });

                DJSMsgLogger('Successfully connected to MongoDB.');

                resolved({
                    returned: 1,
                    data: {
                        connected: true,
                        cluster: this.uri,
                    },
                    errors: null
                });
            } catch (err) {
                DJSMsgLogger('Couldn\'t connect to MongoDB.');

                rejected({
                    returned: 0,
                    data: {
                        connected: false,
                        cluster: this.uri,
                    },
                    errors: err
                });
            };
        });
    };
};

module.exports = MongoDBConnector;