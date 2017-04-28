import test from 'tape';
import ChatExtensionHomeUrl from '../../src/messengerProfile/chatExtensionHome';

test('ChatExtensionHomeUrl', (expect) => {
    const chatExtensionHomeUrl = new ChatExtensionHomeUrl('http://davidshats.com/send-a-hat', true)
        .setShareStatus('show');
    expect.same(chatExtensionHomeUrl, {
        url: 'http://davidshats.com/send-a-hat',
        webview_height_ratio: 'tall',
        webview_share_button: 'show',
        in_test: true,
    }, 'should have the correct structure');
    expect.end();
});
