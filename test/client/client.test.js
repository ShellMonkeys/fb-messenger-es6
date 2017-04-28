import test from 'tape';
import sinon from 'sinon';
import fetch from 'node-fetch';
import HttpsProxyAgent from 'https-proxy-agent';
import {
    Client,
    TextMessage,
    MessengerProfile,
    GreetingText,
    ImageAttachment,
} from '../../src/index';

const tearDown = () => fetch.Promise.restore();

const testResponse = {
    generic: {
        json: () => ({
            recipient_id: '1008372609250235',
            message_id: 'mid.1456970487936:c34767dfe57ee6e339',
        }),
    },
    userProfile: {
        json: () => ({
            first_name: 'Peter',
            last_name: 'Chang',
            profile_pic: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/p200x200/13055603_10105219398495383_8237637584159975445_n.jpg?oh=1d241d4b6d4dac50eaf9bb73288ea192&oe=57AF5C03&__gda__=1470213755_ab17c8c8e3a0a447fed3f272fa2179ce',
            locale: 'en_US',
            timezone: -7,
            gender: 'male',
        }),
    },
    errorCode: {
        json: () => ({
            error: {
                message: 'Invalid OAuth access token.',
                type: 'OAuthException',
                code: 190,
                error_subcode: 1234567,
                fbtrace_id: 'BLBz/WZt8dN',
            },
        }),
    },
    messengerProfile: {
        json: () => ({
            result: 'success',
        }),
    },
    attachment: {
        json: () => ({
            recipient_id: 'USER_ID',
            message_id: 'mid.1456970487936:c34767dfe57ee6e339',
            attachment_id: '1745504518999123',
        }),
    },
};

test('Client.constructor - no proxy', (expect) => {
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    expect.same(testClient.pageAccessToken, 'PAGE_ACCESS_TOKEN', 'should have page access token');
    expect.same(testClient.proxyAgent, null, 'should have no proxy agent');
    expect.end();
});

test('Client.constructor - with proxy', (expect) => {
    const testClient = new Client('PAGE_ACCESS_TOKEN', {
        hostname: 'localhost',
        port: '404',
    });
    expect.same(testClient.pageAccessToken, 'PAGE_ACCESS_TOKEN', 'should have page access token');
    expect.same(testClient.proxyAgent, new HttpsProxyAgent('localhost:404'), 'should have proxy agent');
    expect.end();
});


test('Client.sendMessage - error', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.errorCode));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.sendMessage(new TextMessage('hello, world!'), 'USER_ID')
        .catch(e => expect.same(e, new Error(testResponse.errorCode.json()
            .error.name), 'should return test response'));
    tearDown();
});

test('Client.getUserProfile', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.userProfile));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.getUserProfile('USER_ID')
        .then(resp => expect.same(resp, testResponse.userProfile.json(), 'should return test response'));
    tearDown();
});

test('Client.markSeen', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.generic));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.markSeen('USER_ID')
        .then(resp => expect.same(resp, testResponse.generic.json(), 'should return test response'));
    tearDown();
});

test('Client.typingToggle - true', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.generic));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.typingToggle(true, 'USER_ID')
        .then(resp => expect.same(resp, testResponse.generic.json(), 'should return test response'));
    tearDown();
});

test('Client.typingToggle - false', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.generic));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.typingToggle(false, 'USER_ID')
        .then(resp => expect.same(resp, testResponse.generic.json(), 'should return test response'));
    tearDown();
});

test('Client.getMessengerProfile', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.messengerProfile));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.getMessengerProfile(new MessengerProfile()
            .setFields(['greeting', 'get_started']))
        .then(resp => expect.same(resp, testResponse.messengerProfile.json(), 'should return test response'));
    tearDown();
});

test('Client.setMessengerProfile', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.messengerProfile));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.setMessengerProfile(new MessengerProfile()
            .setGetStartedButton('Get Started')
            .addGreetingText(new GreetingText('hello, world')))
        .then(resp => expect.same(resp, testResponse.messengerProfile.json(), 'should return test response'));
    tearDown();
});

test('Client.deleteMessengerProfile', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.messengerProfile));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.deleteMessengerProfile(new MessengerProfile()
            .setFields(['greeting', 'get_started']))
        .then(resp => expect.same(resp, testResponse.messengerProfile.json(), 'should return test response'));
    tearDown();
});

test('Client.upload', (expect) => {
    expect.plan(1);
    sinon.stub(fetch, 'Promise')
        .returns(Promise.resolve(testResponse.attachment));
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    testClient.upload(new ImageAttachment('https://davidapparel.parseapp.com/img/shirt.png'))
        .then(resp => expect.same(resp, '1745504518999123', 'should return test response'));
    tearDown();
});
