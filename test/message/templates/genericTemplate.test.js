import test from 'tape';
import {
    GenericTemplate,
    GenericElement,
    UrlButton,
    DefaultAction,
} from '../../../src/message';

test('GenericTemplate', (expect) => {
    const testTemplate = new GenericTemplate([
        new GenericElement('I took Peter\'s \'Which Hat Are You?\' Quiz')
            .setSubTitle('My result: Fez')
            .setImageUrl('https//bot.peters-hats.com/img/hats/fez.jpg')
            .setDefaultAction(new DefaultAction('http://m.me/petershats?ref=invited_by_24601'))
            .addButton(new UrlButton('Take Quiz', 'http://m.me/petershats?ref=invited_by_24601')),
    ]).addElement(new GenericElement('Additional')).withTag('SHIPPING_UPDATE')
    .setSharable(false);
    expect.same(testTemplate, {
        state: {
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
                        {
                            title: 'Additional',
                        },
                    ],
                    image_aspect_ratio: 'horizontal',
                },
            },
        },
        tag: 'SHIPPING_UPDATE',
    }, 'should have the correct structure');
    expect.end();
});
