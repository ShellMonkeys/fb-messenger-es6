# fb-messenger-es6
___
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![Build Status](https://img.shields.io/travis/ShellMonkeys/fb-messenger-es6.svg)](https://travis-ci.org/ShellMonkeys/fb-messenger-es6)
[![Coverage Status](https://img.shields.io/coveralls/ShellMonkeys/fb-messenger-es6.svg)](https://coveralls.io/github/ShellMonkeys/fb-messenger-es6)

Library to work with [Facebook Messenger APIs](https://developers.facebook.com/docs/…).

Table of Contents
=================
* [Setup](#setup)
* [Creating facebook app](#creating-facebook-app)
* [Conversation](#conversation)
  * [Sending Messages](#sending-messages)
  * [Receiving Messages](#receiving-messages)
* [User Profile](#user-profile)
* [Messenger Profile](#messenger-profile)
* [Contributing](#contributing)

## Setup

Install
```
npm install fb-messenger-es6
```
Import
```javascript
import  { Client } from 'fb-messenger-es6';
```
Initialize
```javascript
const facebook = new Client(<PAGE_ACCESS_TOKEN>);
```
Using proxy
```javascript
const facebook = new Client(<PAGE_ACCESS_TOKEN>, { hostname:<PROXY_HOSTNAME>, port: <PROXY_PORT> });
```
Specify the Graph API version

Accepted versions: `v2.6`, `v2.7`, `v2.8`, `v2.9`
```javascript
const facebook = new Client(<PAGE_ACCESS_TOKEN>, null, API_VERSION);
```

## Creating facebook app
[See facebook tutorial](https://developers.facebook.com/docs/messenger-platform/guides/quick-start)


## Conversation
### Sending Messages
#### Text Message
```javascript
// basic message
facebook.sendMessage(new TextMessage('hello, world!'), USER_ID);

// message with quick reply
facebook.sendMessage(new TextMessage('truth or dare?')
    .addQuickReply(new TextQuickReply('truth', 'GAME_TRUTH_PAYLOAD')) //alternative way for setting text quick reply
    .addQuickReply(new TextQuickReply('dare')), USER_ID);
```

#### Sender Actions
```javascript
// Mark last message as read
facebook.markSeen(USER_ID);

// Toggle typing indicators on or off
facebook.typingToggle(true, USER_ID); // true - on; false - off

// Alternatively
facebook.sendAction(SENDER_ACTION, USER_ID);
```

#### Attachment Reuse
```javascript
const attachmentId = facebook.upload(new ImageAttachment('https://myapp.com/img/image.png'));

// subsequent calls using attachment_id
facebook.sendMessage(new ImageAttachment(null, attachmentId));
```

#### Supported Messages
- Text Messages
- Rich Media Messages (with attachment reuse)
    - Image
    - Video
    - Audio
    - File
- Structured Messages
    - Button Template
    - Generic Template
    - List Template
- [Buttons](https://gist.github.com/radTuti/5696449aca55f2a18662fdafb9eabdca)
    - URL button
    - Postback button
    - Call button
    - Share button
    - Log In and Log Out buttons
- Quick Replies (works in text, rich media & structured messages)

More to be added later.

psst...see [tests](https://github.com/ShellMonkeys/fb-messenger-es6/tree/master/test/message) for example of how messages are constructed.

### Receiving Messages
This section has code snippets for an express.js app

You should validate the signature before proceeding
```javascript
import bodyParser from 'body-parser';
import { ValidateSignature } from 'fb-messenger-es6';
...
const validator = new ValidateSignature(APP_SECRET);
app.post('/webhook', bodyParser.json({ verify: (req, res, bf) => validator.validate(req, res, bf) }));
```

You can process the callbacks using `ProcessIncoming` which returns a minimal version of the callback to make it easier to handle
```javascript
import { ProcessIncoming } from 'fb-messenger-es6';
...
app.use('/webhook', (req, res) => {
    if (req.method === 'GET') {
        if (req.query['hub.mode'] === 'subscribe' &&
            req.query['hub.verify_token'] === VERIFY_TOKEN) {
            return res.status(200).send(req.query['hub.challenge']);
        }
        return res.sendStatus(403);
    }
    else if (req.method === 'POST') {
        // Facebook requires a 200 OK HTTP res as fast as possible
        res.sendStatus(200);

        // NOTE: ProcessIncoming returns messages grouped by PAGE_ID
        const messages = ProcessIncoming(req.body);

        for (const message of messages[PAGE_ID]){
            handleMessage(message);
        }
    }
});
```
#### `ProcessIncoming`
Messages are grouped by PAGE_ID and contain callback default fields (`sender`, `recipient`, `timestamp`, `type`) and additional callback specific fields
```javascript
{
    PAGE_ID: [
        {
            sender: 'USER_ID',
            recipient: 'PAGE_ID',
            timestamp: 1458692752478,
            type: '???', // message or message_read or message_echo or message_delivery or postback or account_linking
            ...CALLBACK_SPECIFIC_FIELDS,
        },
    ],
}
```

Below are the various `CALLBACK_SPECIFIC_FIELDS` returned after processing a callback:
##### Message
The callback default field `type` is `message`

**Text Message**
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    text: 'hello, world!',
    quick_reply: 'DEVELOPER_DEFINED_PAYLOAD', // optional
}
```
**Rich Media  Messages**

NOTE: `attachment.type` can be `image`, `audio`, `video` or `file`
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    attachments: [
        {
            type: '???', // image or audio or video or file
            url: 'ATTACHMENT_URL',
        },
    ],
}
```
**Stickers**

When processing sticker messages, pass in your stickers map to text so you get `sticker_type`
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    attachments: [
        {
            type: 'sticker',
            sticker_id: 369239343222814,
            sticker_type: 'LIKE',
        },
    ],
}
```
**Location**
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    attachments: [
        {
            type: 'location',
            long: '-79.411079',
            lat: '43.761539',
        },
    ],
}
```
##### Message Delivered, Message Read & Message Echo
The callback default field `type` changes to `message_delivery`, `message_read` & `message_echo` respectively.
There are no callback specific fields

##### Postback
The callback default field `type` is `postback`
**NOTE**: As this could contain referral attribute, implementation could prioritize that over the `payload`
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    payload: 'USER_DEFINED_PAYLOAD',
    source: 'SHORTLINK',
    ref: 'REF_DATA_SPECIFIED',
    source: 'SOURCE', // e.g 'SHORTLINK', 'ADS', 'MESSENGER_CODE' or 'DISCOVER_TAB'
    ad_id: 'AD_ID', // if source === 'ADS'
    type: 'OPEN_THREAD',
}
```
##### Account Linking Event
The callback default field `type` is `account_linking`
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    status: 'linked',
    authorization_code: 'PASS_THROUGH_AUTHORIZATION_CODE',
}
```
##### Referral
The callback default field `type` is `referral`
```javascript
{
    ...CALLBACK_DEFAULT_FIELDS,
    source: 'SHORTLINK',
    ref: 'REF_DATA_SPECIFIED',
    source: 'SOURCE', // e.g 'SHORTLINK', 'ADS', 'MESSENGER_CODE' or 'DISCOVER_TAB'
    ad_id: 'AD_ID', // if source === 'ADS'
    type: 'OPEN_THREAD',
}
```

## User Profile
```javascript
// if no second arg, it defaults to all
// possible fields ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral']
facebook.getUserProfile(<USER_ID>);

// To specify fields, pass in a second arg
facebook.getUserProfile(<USER_ID>, ['is_payment_enabled']);
```
## Messenger Profile
```javascript
import { MessengerProfile } from 'fb-messenger-es6';
```
### Setting properties
```javascript
facebook.setMessengerProfile(new MessengerProfile().setGetStartedButton('Get Started')
    .addGreetingText(new GreetingText('hello, world')));
```
### Reading properties
```javascript
facebook.getMessengerProfile(new MessengerProfile().setFields(['greeting', 'get_started']));
```
### Deleting properties
```javascript
facebook.deleteMessengerProfile(new MessengerProfile().setFields(['greeting', 'get_started']));
```

## Contributing
If you would like to contribute, you can fork the repository and send us pull reqs.

When submitting code, please make every effort to follow existing conventions and style in order to keep the code as readable as possible.
