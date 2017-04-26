import test from 'tape';
import UrlButton from '../../../src/message/buttons/urlButton';

test('UrlButton', (expect) => {
    const testButton = new UrlButton('Take the Hat Quiz', 'http://m.me/petershats?ref=take_quiz');
    testButton.setFallbackUrl('http://m.me/petershats?ref=take_quiz').disableSharing();
    expect.same(testButton, {
        type: 'web_url',
        title: 'Take the Hat Quiz',
        url: 'http://m.me/petershats?ref=take_quiz',
        webview_height_ratio: 'full',
        fallback_url: 'http://m.me/petershats?ref=take_quiz',
        messenger_extensions: true,
        webview_share_button: 'hide',
    }, 'should have the correct structure');
    expect.end();
});

test('UrlButton - with messenger extensions underfined', (expect) => {
    const testButton = new UrlButton('Test Ext Button', 'http://m.me/test_url');
    expect.same(testButton, {
        type: 'web_url',
        title: 'Test Ext Button',
        url: 'http://m.me/test_url',
        webview_height_ratio: 'full' });
    expect.end();
});

test('UrlButton - use messenger extensions', (expect) => {
    const testButton = new UrlButton('Test Ext Button', 'http://m.me/test_url');
    testButton.enableMessengerExtensions();
    expect.same(testButton, {
        messenger_extensions: true,
        type: 'web_url',
        title: 'Test Ext Button',
        url: 'http://m.me/test_url',
        webview_height_ratio: 'full' });
    expect.end();
});
