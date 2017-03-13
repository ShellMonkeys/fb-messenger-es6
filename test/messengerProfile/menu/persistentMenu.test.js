import test from 'tape';
import {
    PersistentMenu,
    UrlMenuItem,
    PostbackMenuItem,
} from '../../../src/messengerProfile/menu';

test('PersistentMenu.constructor', (expect) => {
    let testItem;
    try {
        testItem = new PersistentMenu([
            new PostbackMenuItem('History', 'HISTORY_PAYLOAD'),
            new UrlMenuItem('Help', 'http://help.me'),
        ]);
        expect.same(testItem, {
            locale: 'default',
            composer_input_disabled: false,
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

test('PersistentMenu.addAction', (expect) => {
    const testItem = new PersistentMenu([new PostbackMenuItem('About', 'BOT_INFO'), new PostbackMenuItem('Settings', 'SETTINGS')])
        .addAction(new UrlMenuItem('Question?', 'http://help.me/ask'));
    expect.same(testItem, {
        locale: 'default',
        composer_input_disabled: false,
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

test('PersistentMenu - user input disabled', (expect) => {
    const testItem = new PersistentMenu().setLocale('en_us').disableUserInput(true);
    expect.same(testItem, {
        locale: 'en_us',
        composer_input_disabled: true,
    }, 'should have the correct structure');
    expect.end();
});
