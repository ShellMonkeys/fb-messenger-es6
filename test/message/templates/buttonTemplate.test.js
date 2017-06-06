import test from 'tape';
import {
    UrlButton,
    PostbackButton,
} from '../../../src/message/buttons';
import ButtonTemplate from '../../../src/message/templates/buttonTemplate';

test('ButtonTemplate', (expect) => {
    const testTemplate = new ButtonTemplate('What do you want to do next?', [
        new UrlButton('Show Website', 'https://petersapparel.parseapp.com'),
    ]).addButton(new PostbackButton('Start Chatting', 'CHAT_PAYLOAD'));
    expect.same(testTemplate, {
        state: {
            attachment: {
                type: 'template',
                payload: {
                    template_type: 'button',
                    text: 'What do you want to do next?',
                    buttons: [
                        {
                            type: 'web_url',
                            url: 'https://petersapparel.parseapp.com',
                            title: 'Show Website',
                            webview_height_ratio: 'full',
                        },
                        {
                            type: 'postback',
                            title: 'Start Chatting',
                            payload: 'CHAT_PAYLOAD',
                        },
                    ],
                },
            },
        },
    }, 'should have the correct structure');
    expect.end();
});
