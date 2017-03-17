import test from 'tape';
import PaymentSettings from '../../src/messengerProfile/paymentSettings';

test('PaymentSettings', (expect) => {
    const paymentSettings = new PaymentSettings()
        .setPrivacyUrl('www.facebook.com')
        .setPublicKey('PAYMENT_PUBLIC_KEY')
        .setTestUsers([12345678]);
    expect.same(paymentSettings, {
        privacy_url: 'www.facebook.com',
        public_key: 'PAYMENT_PUBLIC_KEY',
        test_users: [
            12345678,
        ],
    }, 'should have the correct structure');
    expect.end();
});
