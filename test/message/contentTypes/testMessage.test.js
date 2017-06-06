import test from 'tape';
import TextMessage from '../../../src/message/contentTypes/textMessage';

test('TextMessage.constructor', (expect) => {
    const testTextMsg = new TextMessage('hello, world!');
    expect.same(testTextMsg, {
        state: {
            text: 'hello, world!',
        },
    }, 'should have the correct structure');
    expect.end();
});
