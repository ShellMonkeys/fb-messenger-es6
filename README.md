<H2>fb-messenger-es6</H2>
[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)
[![Build Status](https://img.shields.io/travis/ShellMonkeys/fb-messenger-es6.svg)](https://travis-ci.org/ShellMonkeys/fb-messenger-es6)
[![Coverage Status](https://img.shields.io/coveralls/ShellMonkeys/fb-messenger-es6.svg)](https://coveralls.io/github/ShellMonkeys/fb-messenger-es6)

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
const facebook = new Client(<PAGE_ACCESS_TOKEN>);
```
If you need to use proxy:
```javascript
const facebook = new Client(<PAGE_ACCESS_TOKEN>, { hostname:<PROXY_HOSTNAME>, port: <PROXY_PORT> });
```


<H3>Creating facebook app</H3>
[See facebook tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)


<H3>Sending messages</H3>
<H4>Text Message</H4>
```javascript
// basic message
facebook.send(new TextMessage('hello, world!'), <recipient_id>);

// message with quick reply
facebook.send(new TextMessage('truth or dare?')
    .addQuickReply(new TextQuickReply('truth'))
    .addQuickReply(new TextQuickReply('dare')), <recipient_id>);
```

<H4>Sender Actions </H4>
```javascript
facebook.senderActions('mark_seen', <recipient_id>);
```

<H4>Others supported</H4>
- Content Types
    - Text
    - Image
- Templates
    - Button Template
    - Generic Template
    - List Template
- Buttons
    - URL Button
    - Postback Button
    - Call Button
    - Share Button
    - Log In and Log Out buttons
- Quick Replies

More to be added

<H3>User Profile</H3>
```javascript
facebook.getProfile(<USER_ID>);// if no second arg, it defaults to all - ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender']
```
<H3>Messenger Profile</H3>
All except payments settings are supported
<H4>Setting properties</H4>
```javascript
facebook.updateBotSettings(new MessengerProfile().setGetStartedButton('Get Started')
    .addGreetingText(new GreetingText('hello, world')));
```
<H4>Reading properties</H4>
```javascript
facebook.viewBotSettings(new MessengerProfile().setFields['greeting', 'get_started']);
```
<H4>Deleting properties</H4>
```javascript
facebook.deleteBotSettings(new MessengerProfile().setFields['greeting', 'get_started']);
```

<H3>Contributing</H3>
If you would like to contribute, you can fork the repository and send us pull requests.

When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.
