/**
 * @typedef {Object} keys
 * 
 * @property {'EmptyParameterReceived'} EmptyParameterReceived
 * @property {'InvalidParameterType'} InvalidParameterType
 * 
 * @property {'InvalidArrayElement'} InvalidArrayElement
 * @property {'MissingArrayElement'} MissingArrayElement
 * @property {'InvalidArrayLength'} InvalidArrayLength
 * 
 * @property {'MissingRequiredParameter'} MissingRequiredParameter
 * @property {'MissingRequiredMethod'} MissingRequiredMethod
 * 
 * @property {'InternalError'} InternalError
 * @property {'DependencyError'} DependencyError
 * @property {'UnknownError'} UnknownError
 * @property {'ReceivedMultipleErrors'} ReceivedMultipleErrors
 * @property {'EventEmitterFailed'} EventEmitterFailed
 * 
 * @property {'CustomErrorReason'} CustomErrorReason
 */

const keys = [
    'EmptyParameterReceived',
    'InvalidParameterType',

    'InvalidArrayElement',
    'MissingArrayElement',
    'InvalidArrayLength',

    'MissingRequiredParameter',
    'MissingRequiredMethod',

    'InternalError',
    'DependencyError',
    'UnknownError',
    'ReceivedMultipleErrors',
    'EventEmitterFailed',

    'CustomErrorReason'
];

/**
 * @type {keys}
 * @ignore
 */

module.exports = Object.fromEntries(keys.map(key => [key, key]));