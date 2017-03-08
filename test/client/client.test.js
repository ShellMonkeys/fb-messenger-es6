import test from 'tape';
import HttpsProxyAgent from 'https-proxy-agent';
import Client from '../../src/client/client';

test('Client.constructor - no proxy', (expect) => {
    const testClient = new Client('PAGE_ACCESS_TOKEN');
    expect.same(testClient.pageAccessToken, 'PAGE_ACCESS_TOKEN', 'should have page access token');
    expect.same(testClient.proxyAgent, null, 'should have no proxy agent');
    expect.end();
});

test('Client.constructor - with proxy', (expect) => {
    const testClient = new Client('PAGE_ACCESS_TOKEN', { hostname: 'localhost', port: '404' });
    expect.same(testClient.pageAccessToken, 'PAGE_ACCESS_TOKEN', 'should have page access token');
    expect.same(testClient.proxyAgent, new HttpsProxyAgent('localhost:404'), 'should have proxy agent');
    expect.end();
});
