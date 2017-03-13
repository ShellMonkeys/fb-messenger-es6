import test from 'tape';
import UrlMenuItem from '../../../src/messengerProfile/menu/urlItem';

test('UrlMenuItem.constructor', (expect) => {
    let testItem;
    try {
        testItem = new UrlMenuItem('Latest News', 'http://news.com/latest');
        expect.same(testItem, {
            type: 'web_url',
            title: 'Latest News',
            url: 'http://news.com/latest',
            webview_height_ratio: 'full',
        }, 'should have the right structure');
    }
    catch (e) {
        expect.fail('should not throw any error');
    }
    expect.end();
});
