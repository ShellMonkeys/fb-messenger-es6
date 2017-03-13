import test from 'tape';
import {
    NestedMenuItem,
    UrlMenuItem,
    PostbackMenuItem,
} from '../../../src/messengerProfile/menu';

test('NestedMenuItem.constructor', (expect) => {
    let testItem;
    try {
        testItem = new NestedMenuItem('My Account', [
            new PostbackMenuItem('History', 'HISTORY_PAYLOAD'),
            new UrlMenuItem('Help', 'http://help.me'),
        ]);
        expect.same(testItem, {
            title: 'My Account',
            type: 'nested',
            call_to_actions: [
                {
                    type: 'postback',
                    title: 'History',
                    payload: 'HISTORY_PAYLOAD',
                },
                {
                    title: 'Help',
                    type: 'web_url',
                    url: 'http://help.me',
                    webview_height_ratio: 'full',
                },
            ],
        }, 'should have the correct structure');
    }
    catch (e) {
        expect.fail('should not throw any errors');
    }
    expect.end();
});

test('NestedMenuItem.addAction', (expect) => {
    const testItem = new NestedMenuItem('Help', [new PostbackMenuItem('About', 'BOT_INFO'), new PostbackMenuItem('Settings', 'SETTINGS')])
        .addAction(new UrlMenuItem('Question?', 'http://help.me/ask'));
    expect.same(testItem, {
        title: 'Help',
        type: 'nested',
        call_to_actions: [
            {
                type: 'postback',
                title: 'About',
                payload: 'BOT_INFO',
            },
            {
                type: 'postback',
                title: 'Settings',
                payload: 'SETTINGS',
            },
            {
                title: 'Question?',
                type: 'web_url',
                url: 'http://help.me/ask',
                webview_height_ratio: 'full',
            },
        ],
    }, 'should have structure with new action included');
    expect.end();
});
