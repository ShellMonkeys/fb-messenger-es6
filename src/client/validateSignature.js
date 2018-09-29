import crypto from 'crypto';
import validate from '../util/validate';
import log from '../util/logger';

const message = {
    failure: 'Invalid signature',
    success: 'Valid signature',
};

export default class ValidateSignature {
    constructor(appSecret) {
        validate.notNull(appSecret, 'app secret', 'ValidateSignature.constructor');
        this.appSecret = appSecret;
        return this;
    }

    // @deprecated use the one for the framework
    validate(request, response, buffer) {
        this.express(request, response, buffer);
    }

    express(request, response, buffer) {
        const expected = request.get('X-Hub-Signature');
        const hmac = crypto.createHmac('sha1', this.appSecret);
        hmac.update(buffer, 'utf-8');

        const computed = `sha1=${hmac.digest('hex')}`;

        if (!expected || expected !== computed) {
            throw new Error(message.error);
        }
        log.debug(message.success);
    }

    hapi(request, h) {
        const { headers, payload } = request;
        const expected = headers['x-hub-signature'];
        const hmac = crypto.createHmac('sha1', this.appSecret);
        hmac.update(Buffer.from(JSON.stringify(payload)), 'utf-8');

        const computed = `sha1=${hmac.digest('hex')}`;

        if (!expected || expected !== computed) {
          throw new Error(message.failure);
        }
        log.debug(message.success);
        return h.response(message.success);
    }
}
