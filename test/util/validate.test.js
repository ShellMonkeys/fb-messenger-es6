import test from 'tape';
import sinon from 'sinon';
import log from '../../src/util/logger';
import validate from '../../src/util/validate';

test('validate.checkParam - arg is undefined', (expect) => {
    try {
        validate.isArray(undefined, 'checkParamTest', 'validate.isArray.test');
        expect.fail('should throw error about missing arg');
    }
    catch (e) {
        expect.equals(e.message, 'validate.isArray: missing parameter - argument to validate', 'should throw error about missing arg');
    }
    expect.end();
});

test('validate.isArray - no error', (expect) => {
    try {
        validate.isArray(['this', 'is', 'an', 'array'], 'arrayTest', 'validate.isArray.test');
        expect.pass('should not throw error for valid array');
    }
    catch (e) {
        expect.fail('should not throw error for array');
    }
    expect.end();
});

test('validate.isArray - error', (expect) => {
    try {
        validate.isArray('non-array', 'arrayTest', 'validate.isArray.test');
        expect.fail('should throw error for non-array');
    }
    catch (e) {
        expect.equals(e.message, 'validate.isArray.test: wrong parameter type - arrayTest', 'should throw error for non-array');
    }
    expect.end();
});

test('validate.isString - error', (expect) => {
    try {
        validate.isString(['this', 'is', 'an', 'array'], 'strTest', 'validate.isString.test');
        expect.fail('should throw error for string input');
    }
    catch (e) {
        expect.equals(e.message, 'validate.isString.test: wrong parameter type - strTest', 'should throw error for invalid string input');
    }
    expect.end();
});

test('validate.isString - no error', (expect) => {
    try {
        validate.isString('some string', 'strTest', 'validate.isString.test');
        expect.pass('should not throw error for string input');
    }
    catch (e) {
        expect.fail('should not throw error for valid string input');
    }
    expect.end();
});

test('validate.isStringOrStringArray - no error', (expect) => {
    try {
        validate.isStringOrStringArray(['this', 'is', 'an', 'array'], 'strArrTest', 'validate.isStringOrStringArray.test');
        validate.isStringOrStringArray('this is a string', 'strArrTest', 'validate.isStringOrStringArray.test');
        expect.pass('should not throw error for string or array of strings input');
    }
    catch (e) {
        expect.fail('should not throw error for string or array of strings input');
    }
    expect.end();
});

test('validate.isStringOrStringArray - error', (expect) => {
    try {
        validate.isStringOrStringArray(['this', 'is', 1, 'array'], 'strArrTest', 'validate.isStringOrStringArray.test');
        expect.fail('should throw error for invalid input');
    }
    catch (e) {
        expect.equals(e.message, 'validate.isStringOrStringArray.test: wrong parameter type - strArrTest', 'should throw error for invalid input');
    }
    expect.end();
});

test('validate.length - no min or max provided', (expect) => {
    try {
        validate.length('something', null, null, 'lengthTest', 'validate.length.test');
        expect.pass('should throw no error since no validation happened');
    }
    catch (e) {
        expect.fail('should throw no error since no validation happened');
    }
    expect.end();
});

test('validate.stringLength - no error with throwError = false', (expect) => {
    const errorLog = sinon.stub(log, 'error');
    try {
        validate.stringLength('something', 10, 20, 'strLengthTest', 'validate.stringLength.test');
        expect.true(errorLog.firstCall.calledWith('validate.stringLength.test.strLengthTest:  \'something\' violated the character limit. Minimum of 10. Maximum of 20.'), 'should log the error');
    }
    catch (e) {
        expect.fail('should not throw error even if it error');
    }
    finally {
        log.error.restore();
    }
    expect.end();
});

test('validate.stringLength - error with throwError = true', (expect) => {
    const errorLog = sinon.stub(log, 'error');
    try {
        validate.stringLength('something', 5, 5, 'strLengthTest', 'validate.stringLength.test', true);
        expect.fail('should throw error on string length');
    }
    catch (e) {
        expect.false(errorLog.calledWith('validate.stringLength.test.strLengthTest:  something violated the character limit. Minimum of 5. Maximum of 5.'));
        expect.equals(e.message, 'validate.stringLength.test: strLengthTest requires a maximum  5 - something', 'should throw error on string length');
    }
    finally {
        log.error.restore();
    }
    expect.end();
});

test('validate.arrayLength - no error', (expect) => {
    try {
        validate.arrayLength(['something'], 1, 1, 'arrLengthTest', 'validate.arrayLength.test');
        expect.pass('should not throw error on string length');
    }
    catch (e) {
        expect.fail('should not throw error on array length');
    }
    expect.end();
});

test('validate.required - error', (expect) => {
    const args = { name: 'name', some: { other: 'other' } };
    const mandatory = ['name', 'some.thing'];
    try {
        validate.required(args, mandatory, 'validate.required.test');
        expect.fail('should throw error about missing required property');
    }
    catch (e) {
        expect.equals(e.message, 'validate.required.test: missing parameter - some.thing', 'should throw error about missing required property');
    }
    expect.end();
});

test('validate.required - no error', (expect) => {
    const args = { name: 'name', some: { thing: 'thing' } };
    const mandatory = ['name', 'some.thing'];
    try {
        const returned = validate.required(args, mandatory, 'validate.required.test');
        expect.same(returned, args, 'should return arguments');
    }
    catch (e) {
        expect.fail('should not throw error about missing required property');
    }
    expect.end();
});

test('validate.oneOf - error', (expect) => {
    try {
        validate.oneOf('snapchat', ['messenger', 'whatsapp', 'instagram'], 'oneOfTest', 'validate.oneOf.test');
        expect.fail('should throw error for invalid input');
    }
    catch (e) {
        expect.equals(e.message, 'validate.oneOf.test: Value for oneOfTest must be one of messenger,whatsapp,instagram', 'should throw error for invalid input');
    }
    expect.end();
});

test('validate.oneOf - no error', (expect) => {
    try {
        validate.oneOf('messenger', ['messenger', 'whatsapp', 'instagram'], 'oneOfTest', 'validate.oneOf.test');
        expect.pass('should not throw error for valid input');
    }
    catch (e) {
        expect.fail('should not throw error for valid input');
    }
    expect.end();
});

test('validate.url - no error', (expect) => {
    try {
        validate.url('http://www.google.com', 'validate.url.test');
        expect.pass('should not throw error for valid url');
    }
    catch (e) {
        expect.fail('should not throw error for valid url');
    }
    expect.end();
});

test('validate.url - error', (expect) => {
    try {
        validate.url('http://www.google/com', 'validate.url.test');
        expect.fail('should throw error for invalid url');
    }
    catch (e) {
        expect.equals(e.message, 'validate.url.test: Invalid url - http://www.google/com', 'should throw error for invalid url');
    }
    expect.end();
});

test('validate.notNull - no error', (expect) => {
    try {
        validate.notNull('something', 'testObj', 'validate.notNull.test');
        expect.pass('should not throw error for string input');
    }
    catch (e) {
        expect.fail('should not throw error for string input');
    }
    expect.end();
});

test('validate.notNull - error', (expect) => {
    try {
        validate.notNull(undefined, 'testObj', 'validate.notNull.test');
        expect.fail('should throw error for undefined input');
    }
    catch (e) {
        expect.pass('should throw error for undefined input');
    }
    expect.end();
});

test('validate.isEmpty', (expect) => {
    expect.true(validate.isEmpty(null, 'emptyTest', 'validate.isEmpty.test'), 'should return true for null');
    expect.true(validate.isEmpty('', 'emptyTest', 'validate.isEmpty.test'), 'should return true for empty string');
    expect.true(validate.isEmpty([], 'emptyTest', 'validate.isEmpty.test'), 'should return true for empty array');
    expect.false(validate.isEmpty(' ', 'emptyTest', 'validate.isEmpty.test'), 'should return false for space in string');
    expect.end();
});
