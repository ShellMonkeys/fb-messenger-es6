import test from 'tape';
import Message from '../../src/message/message';
import {
    TextMessage,
    LocationQuickReply,
    TextQuickReply,
} from '../../src/message';

test('Message - with no text or attachment', (expect) => {
    const testMsg = new Message();
    try {
        testMsg.getMessage();
        expect.fail('should throw error');
    }
    catch (e) {
        expect.same(e.message, 'Message.getMessage: You cannot send a text and an attachment together, please read the Send API Reference for more details');
        expect.same(testMsg, {}, 'should not have a message object');
    }
    expect.end();
});

test('Message - with quick reply', (expect) => {
    const testMsg = new TextMessage('Please share your location:');
    testMsg.setQuickReplies([new LocationQuickReply()]);
    expect.same(testMsg, {
        text: 'Please share your location:',
        quick_replies: [
            {
                content_type: 'location',
            },
        ],
    }, 'should have the correct structure with quick reply');
    expect.end();
});

test('Message.addQuickReply', (expect) => {
    const testMsg = new TextMessage('Truth or Dare?');
    testMsg.addQuickReply(new TextQuickReply('Truth', 'TRUTH_PAYLOAD'))
        .addQuickReply(new TextQuickReply('Dare', 'DARE_PAYLOAD'));
    expect.same(testMsg.getMessage(), {
        text: 'Truth or Dare?',
        quick_replies: [
            {
                content_type: 'text',
                title: 'Truth',
                payload: 'TRUTH_PAYLOAD',
            },
            {
                content_type: 'text',
                title: 'Dare',
                payload: 'DARE_PAYLOAD',
            },
        ],
    }, 'should have the correct structure');
    expect.end();
});
