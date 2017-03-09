import test from 'tape';
import DefaultAction from '../../src/message/defaultAction';

test('DefaultAction', (expect) => {
    const testButton = new DefaultAction('http://m.me/petershats?ref=take_quiz');
    expect.same(testButton, {
        type: 'web_url',
        url: 'http://m.me/petershats?ref=take_quiz',
    }, 'should have the correct structure');
    expect.end();
});
