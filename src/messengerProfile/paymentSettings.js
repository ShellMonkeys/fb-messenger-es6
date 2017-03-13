import validate from '../util/validate';

export default class PaymentSettings {
    setPrivacyUrl(url) {
        validate.url(url, 'PaymentSettings.setPrivacyUrl');
        this.privacy_url = url;
        return this;
    }

    setPublicKey(key) {
        validate.isString(key, 'public_key', 'PaymentSettings.setPublicKey');
        this.public_key = key;
        return this;
    }

    setTestUsers(users) {
        validate.isArray(users, 'test_users', 'PaymentSettings.setTestUsers');
        for (const user of users) {
            validate.isNumber(user, 'user.type', 'PaymentSettings.setTestUsers');
        }
        this.test_users = users;
        return this;
    }
}
