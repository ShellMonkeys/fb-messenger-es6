import test from 'tape';
import GreetingText from '../../src/messengerProfile/greetingText';

test('GreetingText.constructor - locale not set', (expect) => {
    let testGreeting;
    try {
        testGreeting = new GreetingText('Hello!');
        expect.same(testGreeting, { locale: 'default', text: 'Hello!' }, 'should set greeting text');
    }
    catch (e) {
        expect.fail('should not throw any errors');
    }
    expect.end();
});

test('GreetingText.constructor - locale set', (expect) => {
    let testGreeting;
    try {
        testGreeting = new GreetingText('Hello', 'en_us');
        expect.same(testGreeting, { locale: 'en_us', text: 'Hello' }, 'should set greeting text');
    }
    catch (e) {
        expect.fail('should not throw any errors');
    }
    expect.end();
});
