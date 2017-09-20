import test from 'tape';
import ShareButton from '../../../src/message/buttons/shareButton';
import GenericTemplate from '../../../src/message/templates/genericTemplate';
import { GenericElement } from '../../../src/message/element';
import DefaultAction from '../../../src/message/defaultAction';
import UrlButton from '../../../src/message/buttons/urlButton';

test('ShareButton', (expect) => {
    const testButton = new ShareButton();
    expect.same(testButton, { type: 'element_share' }, 'should have the correct structure');
    expect.end();
});

test('ShareButton - with message', (expect) => {
    const testButton = new ShareButton();
    testButton.setContents(new GenericTemplate([
        new GenericElement('I took Peter\'s \'Which Hat Are You?\' Quiz')
            .setSubTitle('My result: Fez')
            .setImageUrl('https//bot.peters-hats.com/img/hats/fez.jpg')
            .setDefaultAction(new DefaultAction('http://m.me/petershats?ref=invited_by_24601'))
            .addButton(new UrlButton('Take Quiz', 'http://m.me/petershats?ref=invited_by_24601')),
    ]));
    expect.same(testButton, {
        type: 'element_share',
        share_contents: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'generic',
                    sharable: false,
                    elements: [
                        {
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
                            ],
                        },
                    ],
                    image_aspect_ratio: 'horizontal',
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
