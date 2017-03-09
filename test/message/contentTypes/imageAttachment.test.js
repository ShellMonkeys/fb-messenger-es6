import test from 'tape';
import ImageMessage from '../../../src/message/contentTypes/imageAttachment';

test('ImageMessage.constructor', (expect) => {
    const testImgMsg = new ImageMessage('https://petersapparel.com/img/shirt.png');
    expect.same(testImgMsg, {
        attachment: {
            type: 'image',
            payload: {
                url: 'https://petersapparel.com/img/shirt.png',
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
