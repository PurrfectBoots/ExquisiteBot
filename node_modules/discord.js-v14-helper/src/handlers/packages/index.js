const { DJSError, DJSErrorCodes } = require('../errors/index');
const { packages } = require('./packages');

function _CheckDependencies() {
    packages.forEach((pkg) => {
        try {
            require(pkg);
        } catch {
            throw new DJSError(DJSErrorCodes.DependencyError, pkg);
        };
    });
};

module.exports =  { 
    _CheckDependencies: _CheckDependencies
};