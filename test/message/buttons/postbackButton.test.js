import test from 'tape';
import PostbackButton from '../../../src/message/buttons/postbackButton';

test('PostbackButton', (expect) => {
    const testButton = new PostbackButton('Help', 'HELP_PAYLOAD');
    expect.same(testButton, {
        type: 'postback',
        title: 'Help',
        payload: 'HELP_PAYLOAD',
    }, 'should have the correct structure');
    expect.end();
});
