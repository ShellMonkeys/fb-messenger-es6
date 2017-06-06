import test from 'tape';
import {
    ListTemplate,
    ListElement,
    PostbackButton,
} from '../../../src/message';

test('ListTemplate', (expect) => {
    const testTemplate = new ListTemplate([
        new ListElement('Today\'s Top News')
            .setSubTitle('President signs new bill')
            .setImageUrl('https://davidsnewsapp.bot/todays-top-news'),
        new ListElement('Forest Fires Spread')
            .setSubTitle('The dry season has results')])
        .addElement(new ListElement('Traffic Expected for Upcoming Holiday')
            .setSubTitle('Record traffic is expected'))
        .setButtons([new PostbackButton('View More', 'READ_MORE_PAYLOAD')]);
    expect.same(testTemplate, {
        state: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'list',
                    top_element_style: 'large',
                    elements: [
                        {
                            title: 'Today\'s Top News',
                            subtitle: 'President signs new bill',
                            image_url: 'https://davidsnewsapp.bot/todays-top-news',
                        },
                        {
                            title: 'Forest Fires Spread',
                            subtitle: 'The dry season has results',
                        },
                        {
                            title: 'Traffic Expected for Upcoming Holiday',
                            subtitle: 'Record traffic is expected',
                        },
                    ],
                    buttons: [
                        {
                            title: 'View More',
                            type: 'postback',
                            payload: 'READ_MORE_PAYLOAD',
                        },
                    ],
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
