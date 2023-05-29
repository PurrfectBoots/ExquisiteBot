const { _CheckDependencies } = require('./src/handlers/packages/index');

_CheckDependencies();

module.exports = {
    ApplicationCommandBuilder: require('./src/modules/class/ApplicationCommandBuilder'),
    ApplicationCommandOptionsBuilder: require('./src/modules/class/ApplicationCommandOptionsBuilder'),
    ApplicationCommandsRegister: require('./src/modules/class/ApplicationCommandsRegister'),
    TextFileGenerator: require('./src/modules/class/TextFileGenerator'),
    MongoDBConnector: require('./src/modules/class/MongoDBConnector'),
    ClientPresenceBuilder: require('./src/modules/class/ClientPresenceBuilder'),
    ApplicationCommandChoice: require('./src/modules/class/ApplicationCommandChoice'),
    BetterConsoleLogger: require('./src/modules/class/BetterConsoleLogger'),
    BoostDetector: require('./src/modules/class/BoostDetector'),

    isDiscordServerInvite: require('./src/modules/func/isDiscordServerInvite'),
    isWebURL: require('./src/modules/func/isWebURL'),

    ChannelType: require('./src/modules/properties/ChannelType'),
    CommandOptionType: require('./src/modules/properties/CommandOptionType'),
    CommandType: require('./src/modules/properties/CommandType'),
    Colors: require('./src/modules/properties/Colors'),
    PackageInfo: require('./src/modules/properties/PackageInfo'),
    ClientIntents: require('./src/modules/properties/ClientIntents'),
    ClientPartials: require('./src/modules/properties/ClientPartials'),
};

/**
 * DEVELOPERS: T.F.A#7524
 * 
 * REMOVING THIS COMMENT IS NOT GOING TO MAKE YOU EVADE A COPYRIGHT WARNING BY THE DEVELOPERS.
 * 
 * WORKING IN: T.F.A 7524 - DEVELOPMENT
 * 
 * COPYRIGHT 2022 - 2023 • T.F.A 7524 - DEVELOPMENT
 */