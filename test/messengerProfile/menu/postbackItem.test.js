import test from 'tape';
import PostbackMenuItem from '../../../src/messengerProfile/menu/postbackItem';

test('PostbackMenuItem.constructor', (expect) => {
    let testItem;
    try {
        testItem = new PostbackMenuItem('Help', 'help');
        expect.same(testItem, {
            type: 'postback',
            title: 'Help',
            payload: 'help',
        }, 'should have the right structure');
    }
    catch (e) {
        expect.fail('should not throw any error');
    }
    expect.end();
});
