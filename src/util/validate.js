import log from './logger';

const validate = {};

validate.isNull = arg => arg === undefined || arg === null;

const missingParamError = (nameOfArg, ownerOfArg) => new Error(`${ownerOfArg}: missing parameter - ${nameOfArg}`);

const wrongParamError = (nameOfArg, ownerOfArg) => new Error(`${ownerOfArg}: wrong parameter type - ${nameOfArg}`);

const checkParam = (arg, nameOfArg, functionName) => {
    if (validate.isNull(functionName)) {
        throw new Error('validate: seriously this is the function that\'s calling me!');
    }
    if (validate.isNull(arg)) {
        throw missingParamError(nameOfArg, `validate.${functionName}`);
    }
};

const checkDefaultParams = (arg, ownerOfArg, functionName) => {
    checkParam(arg, 'argument to validate', functionName);
    checkParam(ownerOfArg, 'owner of argument', functionName);
};

const hasOwnNestedProperty = (arg, propertyPath) => {
    let node = arg;
    const properties = propertyPath.split('.');

    for (const prop of properties) {
        if (validate.isNull(node) || !node.hasOwnProperty(prop)) {
            return false;
        }

        node = node[prop];
    }

    return true;
};

validate.isArray = (arg, nameOfArg, ownerOfArg) => {
    checkDefaultParams(arg, ownerOfArg, 'isArray');
    checkParam(nameOfArg, 'name of argument', 'isArray');
    if (!Array.isArray(arg)) {
        throw wrongParamError(nameOfArg, ownerOfArg);
    }
    return arg;
};

validate.isString = (arg, nameOfArg, ownerOfArg) => {
    checkDefaultParams(arg, ownerOfArg, 'isString');
    checkParam(nameOfArg, 'name of argument', 'isString');
    if (typeof arg !== 'string') {
        throw wrongParamError(nameOfArg, ownerOfArg);
    }
    return arg;
};

validate.isStringOrStringArray = (arg, nameOfArg, ownerOfArg) => {
    checkDefaultParams(arg, ownerOfArg, 'isStringOrArrayOfStrings');
    checkParam(nameOfArg, 'name of argument', 'isStringOrArrayOfStrings');
    if (Array.isArray(arg)) {
        arg.forEach((item) => {
            validate.isString(item, nameOfArg, ownerOfArg);
        });
        return arg;
    }
    return validate.isString(arg, nameOfArg, ownerOfArg);
};

validate.length = (arg, min, max, nameOfArg, ownerOfArg) => {
    checkDefaultParams(arg, ownerOfArg, 'length');
    checkParam(nameOfArg, 'name of argument', 'length');
    if (!validate.isNull(min) && arg.length < min) {
        throw new Error(`${ownerOfArg}: ${nameOfArg} requires a minimum of ${min} - ${arg}`);
    }
    if (!validate.isNull(max) && arg.length > max) {
        throw new Error(`${ownerOfArg}: ${nameOfArg} requires a maximum  ${max} - ${arg}`);
    }
};

validate.stringLength = (str, min, max, nameOfArg, ownerOfArg, throwError = false) => {
    validate.isString(str, nameOfArg, ownerOfArg);
    // XXX: do not throw error for length because Facebook handles it
    try {
        validate.length(str, min, max, nameOfArg, ownerOfArg);
    }
    catch (e) {
        if (throwError) {
            throw e;
        }
        log.error(`${ownerOfArg}.${nameOfArg}:  '${str}' violated the character limit. ${validate.isNull(min) ? '' : `Minimum of ${min}.`} ${validate.isNull(max) ? '' : `Maximum of ${max}.`}`);
    }
};

validate.arrayLength = (arr, min, max, nameOfArg, ownerOfArg) => {
    validate.isArray(arr, nameOfArg, ownerOfArg);
    validate.length(arr, min, max, nameOfArg, ownerOfArg);
};

// NOTE: madatory is an array of nameOfArg
validate.required = (args, mandatory, ownerOfArg) => {
    checkDefaultParams(args, ownerOfArg, 'required');
    checkParam(mandatory, 'array of mandatory nameOfArg', 'required');
    const requiredParams = (typeof mandatory === 'object') ? mandatory : [mandatory];
    for (const nameOfArg of requiredParams) {
        if (!hasOwnNestedProperty(args, nameOfArg)) {
            throw missingParamError(nameOfArg, ownerOfArg);
        }
    }
    return args;
};

validate.oneOf = (arg, validValues, nameOfArg, ownerOfArg) => {
    checkDefaultParams(arg, ownerOfArg, 'oneOf');
    checkParam(nameOfArg, 'name of argument', 'oneOf');
    checkParam(validValues, 'valid values', 'oneOf');
    if (!validValues.includes(arg)) {
        throw new Error(`${ownerOfArg}: Value for ${nameOfArg} must be one of ${validValues}`);
    }
};

validate.url = (url, ownerOfArg) => {
    checkDefaultParams(url, ownerOfArg, 'url');
    const urlRegEx = new RegExp('(https?:\\/\\/(?:www\\.|(?!www))[^\\s\\.]+\\.[^\\s]{2,}|www\\.[^\\s]+\\.[^\\s]{2,})', 'i');
    if (!urlRegEx.test(url)) {
            throw new Error(`${ownerOfArg}: Invalid url - ${url}`);
        }
};

validate.notNull = (arg, nameOfArg, ownerOfArg) => {
    checkParam(nameOfArg, 'name of argument', 'notNull');
    checkParam(ownerOfArg, 'owner of argument', 'notNull');
    if (validate.isNull(arg)) {
            throw new Error(`${ownerOfArg}: ${nameOfArg} cannot be null or undefined`);
    }
};

validate.isEmpty = (arg, nameOfArg, ownerOfArg) => {
    checkParam(nameOfArg, 'name of argument', 'isEmpty');
    checkParam(ownerOfArg, 'owner of argument', 'isEmpty');
    return validate.isNull(arg) || Object.keys(arg).length === 0;
};

export default validate;
