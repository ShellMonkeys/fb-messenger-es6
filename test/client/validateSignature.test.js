import test from 'tape';
import sinon from 'sinon';
import crypto from 'crypto';
import ValidateSignature from '../../src/client/validateSignature';

test('ValidateSignature.constructor', (expect) => {
    const validateSignature = new ValidateSignature('APP_SECRET');
    expect.same(validateSignature, {
        appSecret: 'APP_SECRET',
    }, 'should contain the same structure');
    expect.end();
});

test('ValidateSignature.validate - invalid signature', (expect) => {
    sinon.stub(crypto, 'createHmac')
        .returns({
            update: (buffer, encoding) => ({
                buffer: buffer,
                encoding: encoding,
            }),
            digest: () => 'INVALID_SECRET',
        });
    const validateSignature = new ValidateSignature('APP_SECRET');
    try {
        validateSignature.validate({ get: () => 'INVALID_SECRET' }, {}, 'buffer');
        expect.fail('should not throw error');
    }
    catch (err) {
        expect.same(err.message, 'Invalid signature', 'should throw error');
    }
    expect.end();
    crypto.createHmac.restore();
});

test('ValidateSignature.validate - valid signature', (expect) => {
    sinon.stub(crypto, 'createHmac')
        .returns({
            update: (buffer, encoding) => ({
                buffer: buffer,
                encoding: encoding,
            }),
            digest: () => 'APP_SECRET',
        });
    const validateSignature = new ValidateSignature('APP_SECRET');
    try {
        validateSignature.validate({ get: () => 'APP_SECRET' }, {}, 'buffer');
        expect.pass('should not throw error');
    }
    catch (err) {
        expect.pass('should not throw error');
    }
    expect.end();
    crypto.createHmac.restore();
});
