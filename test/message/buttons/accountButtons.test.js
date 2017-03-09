import test from 'tape';
import { LogInButton, LogOutButton } from '../../../src/message/buttons/accountButtons';

test('LogInButton', (expect) => {
    const testButton = new LogInButton('https://www.example.com/authorize');
    expect.same(testButton, {
        type: 'account_link',
        url: 'https://www.example.com/authorize',
    }, 'should have the correct structure');
    expect.end();
});

test('LogOutButton', (expect) => {
    const testButton = new LogOutButton();
    expect.same(testButton, {
        type: 'account_unlink',
    }, 'should have the correct structure');
    expect.end();
});
