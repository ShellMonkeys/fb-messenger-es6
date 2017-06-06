import test from 'tape';
import {
    AudioAttachment,
    FileAttachment,
    ImageAttachment,
    VideoAttachment,
} from '../../../src/message/contentTypes/attachment';

test('AudioAttachment.constructor', (expect) => {
    const testMsg = new AudioAttachment('https://petersapparel.com/bin/clip.mp3');
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'audio',
                payload: {
                    url: 'https://petersapparel.com/bin/clip.mp3',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('AudioAttachment.constructor - reuse attachment', (expect) => {
    const testMsg = new AudioAttachment(null, '1745504518999123');
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'audio',
                payload: {
                    attachment_id: '1745504518999123',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('FileAttachment.constructor', (expect) => {
    const testMsg = new FileAttachment('https://petersapparel.com/bin/receipt.pdf');
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'file',
                payload: {
                    url: 'https://petersapparel.com/bin/receipt.pdf',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('FileAttachment - url and attachment_id given', (expect) => {
    let testMsg;
    try {
        testMsg = new FileAttachment('https://petersapparel.com/bin/receipt.pdf', '1745504518999123');
        expect.fail('should throw error about attachment_id && url');
    }
    catch (e) {
        expect.same(e.message, 'FileAttachment.constructor: You need either url or attachment_id (not both)', 'should throw error about attachment_id && url');
        expect.same(testMsg, undefined, 'should be empty');
    }
    expect.end();
});

test('ImageAttachment.constructor', (expect) => {
    const testMsg = new ImageAttachment('https://petersapparel.com/img/shirt.png');
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'image',
                payload: {
                    url: 'https://petersapparel.com/img/shirt.png',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('ImageAttachment - reusable attachment', (expect) => {
    const testMsg = new ImageAttachment('https://petersapparel.com/img/shirt.png');
    testMsg.forUpload();
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'image',
                payload: {
                    url: 'https://petersapparel.com/img/shirt.png',
                    is_reusable: true,
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('VideoAttachment.constructor', (expect) => {
    const testMsg = new VideoAttachment('https://petersapparel.com/bin/clip.mp4');
    expect.same(testMsg, {
        state: {
            attachment: {
                type: 'video',
                payload: {
                    url: 'https://petersapparel.com/bin/clip.mp4',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
