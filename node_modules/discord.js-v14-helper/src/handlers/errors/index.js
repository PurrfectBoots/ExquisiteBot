const keys = require('./keys');
const msgs = require('./msgs');

class DJSError {
    constructor (code, ...args) {
        if (!keys[code]) throw new Error('Invalid key provided.')

        return new Error(`[discord.js-v14-helper] [${keys[code]}] ${msgs[code](args)}`)
    };
};

function DJSMsgLogger(msg) {
    console.log('[discord.js-v14-helper] ' + msg);
};

module.exports = {
    DJSError: DJSError,
    DJSErrorCodes: keys,
    DJSMsgLogger: DJSMsgLogger
};