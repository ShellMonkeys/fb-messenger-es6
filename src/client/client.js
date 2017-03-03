import HttpsProxyAgent from 'https-proxy-agent';
import fetch from 'node-fetch';
import validate from '../util/validate';
import log from '../util/logger';
import { MessengerProfile } from '../index';


const facebookMessengerAPIURL = 'https://graph.facebook.com/v2.6';

export default class Client {
    constructor(pageAccessToken, proxy = null) {
        validate.notNull(pageAccessToken, 'PAGE_ACCESS_TOKEN', 'Client.constructor');
        this.pageAccessToken = pageAccessToken;
        this.setProxy(proxy);
        return this;
    }

    setProxy(proxy) {
        if (validate.isNull(proxy)) {
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

    send(message, recipient, notificationType = 'REGULAR') {
        const messageBody = message.getMessage();
        validate.notNull(recipient, 'recipient.id', 'Client.send');
        validate.notNull(messageBody, 'message', 'Client.send');
        validate.oneOf(notificationType, ['REGULAR', 'SILENT_PUSH', 'NO_PUSH'], 'notification_type', 'Client.send');

        const facebookEnvelope = {
            recipient: { id: recipient },
            message: { ...messageBody },
            notification_type: notificationType,
        };

        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/me/messages?access_token=${this.pageAccessToken}`, { body: JSON.stringify(facebookEnvelope) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    getProfile(userId, fields = 'first_name,last_name,profile_pic,locale,timezone,gender') {
        validate.notNull(userId, 'USER_ID', 'Client.getProfile');

        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/${userId}?fields=${fields}&access_token=${this.pageAccessToken}`, { method: 'GET' })
            .then(profile => Promise.resolve(profile))
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    senderActions(action, recipient) {
        validate.notNull(recipient, 'recipient.id', 'Client.senderActions');
        validate.notNull(action, 'sender_action', 'Client.senderActions');
        validate.oneOf(action, ['mark_seen', 'typing_on', 'typing_off'], 'sender_action.type', 'Client.senderActions');

        const facebookEnvelope = {
            recipient: { id: recipient },
            sender_action: action,
        };

        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/me/messages?access_token=${this.pageAccessToken}`, { body: JSON.stringify(facebookEnvelope) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    markSeen(recipient) {
        return this.senderActions('mark_seen', recipient);
    }

    typingToggle(typing, recipient) {
        return this.senderActions(typing ? 'typing_on' : 'typing_off', recipient);
    }

    validateBotSettings(settings) {
        validate.oneOf(settings.constructor.name, [MessengerProfile.name], 'Messenger Profile', 'Client.validateBotSettings');
        return this;
    }

    viewBotSettings(profile) {
        this.validateBotSettings(profile);
        const settings = profile.toObject();
        if (validate.isNull(settings.fields)) {
            throw new Error('Client.viewBotSettings: missing profile fields');
        }
        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/me/messenger_profile?fields=${settings.fields}&access_token=${this.pageAccessToken}`, { method: 'GET' })
            .then(botSettings => Promise.resolve(botSettings))
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    updateBotSettings(profile) {
        this.validateBotSettings(profile);
        const settings = profile.toObject();
        if (!validate.isNull(settings.fields) || validate.isEmpty(settings, 'MessengerProfile', 'Client.updateBotSettings')) {
            throw new Error('Client.updateBotSettings: missing profile properties');
        }
        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/me/messenger_profile?access_token=${this.pageAccessToken}`, { body: JSON.stringify(settings) })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }

    deleteBotSettings(profile) {
        this.validateBotSettings(profile);
        const settings = profile.toObject();
        if (validate.isNull(settings.fields)) {
            throw new Error('Client.deleteBotSettings: missing profile fields');
        }
        return this.proxyFetchFacebook(`${facebookMessengerAPIURL}/me/messenger_profile?access_token=${this.pageAccessToken}`, { body: JSON.stringify(settings), method: 'DELETE' })
            .catch((error) => {
                log.error(error);
                return Promise.reject(error);
            });
    }
}
