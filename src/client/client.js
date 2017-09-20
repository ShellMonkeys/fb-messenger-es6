import HttpsProxyAgent from 'https-proxy-agent';
import fetch from 'node-fetch';
import validate from '../util/validate';
import log from '../util/logger';
import {
    MessengerProfile,
    AudioAttachment,
    FileAttachment,
    ImageAttachment,
    VideoAttachment,
} from '../index';


const facebookMessengerAPIURL = 'https://graph.facebook.com';
const userProfileFields = ['first_name', 'last_name', 'profile_pic', 'locale', 'timezone', 'gender', 'is_payment_enabled', 'last_ad_referral'];

export default class Client {
    constructor(pageAccessToken, proxy = null, platformAPIVersion = 'v2.10') {
        validate.notNull(pageAccessToken, 'PAGE_ACCESS_TOKEN', 'Client.constructor');
        this.baseURL = `${facebookMessengerAPIURL}/${platformAPIVersion}`;
        this.pageAccessToken = pageAccessToken;
        this.setProxy(proxy);
        return this;
    }

    setProxy(proxy) {
        if (validate.null(proxy)) {
            this.proxyAgent = null;
            return this;
        }
        validate.required(proxy, ['hostname', 'port'], 'Client.setProxy');
        this.proxyAgent = new HttpsProxyAgent(`${proxy.hostname}:${proxy.port}`);
        return this;
    }

    proxyFetchFacebook(url, { body = null, method = 'POST' } = {}) {
        const fetchOptions = { method: method, headers: { 'Content-Type': 'application/json' }, body: body };
        fetchOptions.agent = this.proxyAgent;
        return fetch(url, fetchOptions)
            .then(resp => resp.json())
            .then((item) => {
                if (item.hasOwnProperty('error')) {
                    return Promise.reject(item.error);
                }

                return Promise.resolve(item);
            }).catch((error) => {
                log.error(error);
                throw new Error(error.message);
            });
    }

    upload(message) {
        validate.oneOf(message.constructor.name, [ImageAttachment.name, AudioAttachment.name, VideoAttachment.name, FileAttachment.name], 'attachment.type', 'Client.upload');
        const messageBody = message.forUpload().getMessage();
        const facebookEnvelope = {
            message: { ...messageBody },
        };

        return this.proxyFetchFacebook(`${this.baseURL}/me/message_attachments?access_token=${this.pageAccessToken}`, { body: JSON.stringify(facebookEnvelope) })
            .then(resp => resp.attachment_id)
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    sendMessage(message, recipientId, notificationType = 'REGULAR') {
        const messageBody = message.getMessage();
        validate.notNull(recipientId, 'recipient.id', 'Client.send');
        validate.notNull(messageBody, 'message', 'Client.send');
        validate.oneOf(notificationType, ['REGULAR', 'SILENT_PUSH', 'NO_PUSH'], 'notification_type', 'Client.send');

        const facebookEnvelope = {
            recipient: { id: recipientId },
            message: { ...messageBody },
            notification_type: notificationType,
        };

        if (message.tag) {
            facebookEnvelope.tag = message.tag;
        }

        return this.proxyFetchFacebook(`${this.baseURL}/me/messages?access_token=${this.pageAccessToken}`, { body: JSON.stringify(facebookEnvelope) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    getUserProfile(userId, fields = userProfileFields) {
        validate.notNull(userId, 'USER_ID', 'Client.getProfile');
        validate.isArray(fields, 'fields', 'Client.getProfile');
        for (const field of fields) {
            validate.oneOf(field, userProfileFields, 'fields', 'Client.getProfile');
        }
        return this.proxyFetchFacebook(`${this.baseURL}/${userId}?fields=${fields}&access_token=${this.pageAccessToken}`, { method: 'GET' })
            .then(profile => Promise.resolve(profile))
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    sendAction(action, recipientId) {
        validate.notNull(recipientId, 'recipient.id', 'Client.senderActions');
        validate.notNull(action, 'sender_action', 'Client.senderActions');
        validate.oneOf(action, ['mark_seen', 'typing_on', 'typing_off'], 'sender_action.type', 'Client.senderActions');

        const facebookEnvelope = {
            recipient: { id: recipientId },
            sender_action: action,
        };

        return this.proxyFetchFacebook(`${this.baseURL}/me/messages?access_token=${this.pageAccessToken}`, { body: JSON.stringify(facebookEnvelope) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    markSeen(recipientId) {
        return this.sendAction('mark_seen', recipientId);
    }

    typingToggle(typing, recipientId) {
        return this.sendAction(typing ? 'typing_on' : 'typing_off', recipientId);
    }

    validateMessengerProfile(profile, fields = true) {
        validate.oneOf(profile.constructor.name, [MessengerProfile.name], 'Messenger Profile', 'Client.validateMessengerProfile');
        this.messenger_profile = profile.toObject();
        for (const key of Object.keys(this.messenger_profile)) {
            validate.oneOf(key, fields ? ['fields'] : MessengerProfile.validProperties(), 'messenger_profile', 'Client.validateMessengerProfile');
        }
        return this;
    }

    setMessengerProfile(profile) {
        this.validateMessengerProfile(profile, false);
        return this.proxyFetchFacebook(`${this.baseURL}/me/messenger_profile?access_token=${this.pageAccessToken}`, { body: JSON.stringify(this.messenger_profile) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    getMessengerProfile(profile) {
        this.validateMessengerProfile(profile);
        return this.proxyFetchFacebook(`${this.baseURL}/me/messenger_profile?fields=${this.messenger_profile.fields}&access_token=${this.pageAccessToken}`, { method: 'GET' })
            .then(botSettings => Promise.resolve(botSettings))
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    deleteMessengerProfile(profile) {
        this.validateMessengerProfile(profile);
        return this.proxyFetchFacebook(`${this.baseURL}/me/messenger_profile?access_token=${this.pageAccessToken}`, { body: JSON.stringify(this.messenger_profile), method: 'DELETE' })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    getUserPageScopedId(accountLinkingToken) {
        return this.proxyFetchFacebook(`${this.baseURL}/me?access_token=${this.pageAccessToken}&fields=recipient&account_linking_token=${accountLinkingToken}`, { method: 'GET' })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    unlinkAccount(userPageScopedId) {
        return this.proxyFetchFacebook(`${this.baseURL}/me/unlink_accounts?access_token=${this.pageAccessToken}`, { body: JSON.stringify({ psid: userPageScopedId }) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }
}
