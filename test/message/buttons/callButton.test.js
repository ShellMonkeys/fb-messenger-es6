import test from 'tape';
import CallButton from '../../../src/message/buttons/callButton';

test('CallButton', (expect) => {
    const testButton = new CallButton('Speak to Human', '+15105551234');
    expect.same(testButton, {
        type: 'phone_number',
        title: 'Speak to Human',
        payload: '+15105551234',
    }, 'should have the correct structure');
    expect.end();
});

test('CallButton - invalid phone number', (expect) => {
    let testButton;
    try {
        testButton = new CallButton('Call Us', '5105551234');
        expect.fail('should throw error on phone number');
    }
    catch (e) {
        expect.same(e.message, 'CallButton.setPhoneNumber - Format must have "+" prefix followed by the country code, area code and local number', 'should throw error on phone number');
        expect.same(testButton, undefined, 'should not set the button');
    }
    expect.end();
});
