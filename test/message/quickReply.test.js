import test from 'tape';
import {
    LocationQuickReply,
    TextQuickReply,
} from '../../src/message/quickReply';

test('LocationQuickReply', (expect) => {
    const testReply = new LocationQuickReply();
    expect.same(testReply, { content_type: 'location' }, 'should have the correct structure');
    expect.end();
});

test('TextQuickReply', (expect) => {
    const testReply = new TextQuickReply('Red', 'RED_PAYLOAD')
        .setImageUrl('http://davidsfantastichats.com/img/red.png');
    expect.same(testReply, {
        content_type: 'text',
        title: 'Red',
        payload: 'RED_PAYLOAD',
        image_url: 'http://davidsfantastichats.com/img/red.png',
    }, 'should have the correct structure');
    expect.end();
});

test('TextQuickReply - without custom Payload', (expect) => {
    const testReply = new TextQuickReply('Red')
        .setImageUrl('http://davidsfantastichats.com/img/red.png');
    expect.same(testReply, {
        content_type: 'text',
        title: 'Red',
        payload: 'Red',
        image_url: 'http://davidsfantastichats.com/img/red.png',
    }, 'should have the correct structure');
    expect.end();
});
