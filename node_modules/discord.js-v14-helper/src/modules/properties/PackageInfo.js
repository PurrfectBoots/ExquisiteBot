/**
 * Get the package information.
 * @type {object}
 * @returns {object}
 * @const
 */

const PackageInfo = {
    name: 'discord.js-v14-helper',
    description: require('../../../package.json').description,
    version: require('../../../package.json').version,
    homepage: require('../../../package.json').homepage,
    license: require('../../../package.json').license,
    developer: require('../../../package.json').author || 'T.F.A#7524', // Do not remove ;)
    typescript_support: true,
    nodejs: require('../../../package.json').engines.node
};

module.exports = PackageInfo;