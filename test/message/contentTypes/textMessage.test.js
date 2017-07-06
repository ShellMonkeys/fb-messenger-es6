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

test('TextMessage.withTag', (expect) => {
    const testTextMsg = new TextMessage('hello, world!').withTag('ISSUE_RESOLUTION');
    expect.same(testTextMsg, {
        state: {
            text: 'hello, world!',
        },
        tag: 'ISSUE_RESOLUTION',
    }, 'should have the correct structure');
    expect.end();
});
