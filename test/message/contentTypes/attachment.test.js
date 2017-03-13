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
        attachment: {
            type: 'audio',
            payload: {
                url: 'https://petersapparel.com/bin/clip.mp3',
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('FileAttachment.constructor', (expect) => {
    const testMsg = new FileAttachment('https://petersapparel.com/bin/receipt.pdf');
    expect.same(testMsg, {
        attachment: {
            type: 'file',
            payload: {
                url: 'https://petersapparel.com/bin/receipt.pdf',
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('ImageAttachment.constructor', (expect) => {
    const testMsg = new ImageAttachment('https://petersapparel.com/img/shirt.png');
    expect.same(testMsg, {
        attachment: {
            type: 'image',
            payload: {
                url: 'https://petersapparel.com/img/shirt.png',
            },
        },
    }, 'should have the correct structure');
    expect.end();
});

test('VideoAttachment.constructor', (expect) => {
    const testMsg = new VideoAttachment('https://petersapparel.com/bin/clip.mp4');
    expect.same(testMsg, {
        attachment: {
            type: 'video',
            payload: {
                url: 'https://petersapparel.com/bin/clip.mp4',
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
