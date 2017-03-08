<H2>fb-messenger-es6</H2>

Library to work with [Facebook Messenger APIs](https://developers.facebook.com/docs/…).


<H3>Installation</H3>

Install:
```
npm install fb-messenger-es6
```
Import:
```javascript
import  { Client } from 'fb-messenger-es6';
```
Initialize:
```javascript
const facebook = new Client(<page_access_token>);
```
If you need to use proxy:
```javascript
const facebook = new Client(<page_access_token>, { hostname:<proxy_hostname>, port: <proxy_port> });
```


<H3>Creating facebook app</H3>
[See facebook tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start#steps%5D)


<H3>Sending message</H3>
```javascript
import  * as Facebook from 'fb-messenger-es6';

const facebook = new Facebook.Client(<page_access_token>);
facebook.send(new Facebook.TextMessage('some text'), <recipient_id>);
```
