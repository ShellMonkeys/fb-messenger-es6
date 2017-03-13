import test from 'tape';
import {
    GenericElement,
    DefaultAction,
    UrlButton,
    PostbackButton,
    ListElement,
} from '../../src/message';

test('GenericElement', (expect) => {
    const testElement = new GenericElement('I took Peter\'s \'Which Hat Are You?\' Quiz')
        .setSubTitle('My result: Fez')
        .setImageUrl('https//bot.peters-hats.com/img/hats/fez.jpg')
        .setDefaultAction(new DefaultAction('http://m.me/petershats?ref=invited_by_24601'))
        .addButton(new UrlButton('Take Quiz', 'http://m.me/petershats?ref=invited_by_24601'))
        .addButton(new PostbackButton('More Info', 'MORE_INFO_PAYLOAD'));
    expect.same(testElement, {
        title: 'I took Peter\'s \'Which Hat Are You?\' Quiz',
        subtitle: 'My result: Fez',
        image_url: 'https//bot.peters-hats.com/img/hats/fez.jpg',
        default_action: {
            type: 'web_url',
            url: 'http://m.me/petershats?ref=invited_by_24601',
        },
        buttons: [
            {
                type: 'web_url',
                url: 'http://m.me/petershats?ref=invited_by_24601',
                title: 'Take Quiz',
                webview_height_ratio: 'full',
            },
            {
                type: 'postback',
                title: 'More Info',
                payload: 'MORE_INFO_PAYLOAD',
            },
        ],
    }, 'should have the correct structure');
    expect.end();
});

test('ListElement', (expect) => {
    const testElement = new ListElement('Classic Blue T-Shirt')
        .setButtons([new PostbackButton('Details', 'DETAILS_PAYLOAD')]);
    expect.same(testElement, {
        title: 'Classic Blue T-Shirt',
        buttons: [
            {
                type: 'postback',
                title: 'Details',
                payload: 'DETAILS_PAYLOAD',
            },
        ],
    }, 'should have the correct structure');
    expect.end();
});
