const keys = require('./keys');

const messages = {
    [keys.EmptyParameterReceived]: (param, orFalse) => `Received parameter \'${param}\' as an empty value${orFalse ? ' or \'false\'.' : "."}`,
    [keys.InvalidParameterType]: (param, type) => `The parameter \'${param}\' is not type of ${type}.`,

    [keys.InvalidArrayElement]: (element) => `Received an invalid element in array: ${element}.`,
    [keys.MissingArrayElement]: (arr) => `Missing element in the array ${arr}.`,
    [keys.InvalidArrayLength]: (arr, arr2) => `The length of the array ${arr} must be equal to length of the array ${arr2}.`,

    [keys.MissingRequiredParameter]: (param) => `The parameter ${param} is required.`,
    [keys.MissingRequiredMethod]: (func) => `The method ${func} is required.`,

    [keys.InternalError]: () => 'An internal error has occured.',
    [keys.DependencyError]: (deps) => `Dependency ${deps} couldn\'t be found.`,
    [keys.UnknownError]: () => 'An unknown error has occured.',
    [keys.ReceivedMultipleErrors]: () => 'Received multiple errors at same time.',
    [keys.EventEmitterFailed]: (cl) => `Failed to emit the event from the class \'${cl}\'`,

    [keys.CustomErrorReason]: (msg) => msg
};

module.exports = messages;