import validate from '../util/validate';

const defaultStickerMap = {
    369239263222822: 'LIKE',
    369239383222810: 'LIKE',
    369239343222814: 'LIKE',
};

function ProcessMessage(entry, stickerMap) {
    // check if sticker map null

    const message = {
        sender: entry.sender.id,
        recipient: entry.recipient.id,
        timestamp: entry.timestamp,
    };

    if (entry.message && !entry.message.is_echo) {
        message.type = 'message';

        if (entry.message.text) {
            message.text = entry.message.text;
        }

        if (entry.message.quick_reply) {
            message.quick_reply = entry.message.quick_reply.payload;
        }

        if (entry.message.attachments) {
            validate.isArray(entry.message.attachments, 'entry.message.attachments', 'ProcessMessage');
            message.attachments = [];
            for (const attachment of entry.message.attachments) {
                const flatAttachment = {
                    type: attachment.type,
                };

                if (attachment.type === 'location') {
                    flatAttachment.long = attachment.payload.coordinates.long;
                    flatAttachment.lat = attachment.payload.coordinates.lat;
                }
                else if (attachment.payload.sticker_id) {
                    flatAttachment.type = 'sticker';
                    flatAttachment.sticker_id = attachment.payload.sticker_id;
                    if (stickerMap.hasOwnProperty(flatAttachment.sticker_id)) {
                        flatAttachment.sticker_type = stickerMap[flatAttachment.sticker_id];
                    }
                }
                else if (['image', 'audio', 'video', 'file'].includes(attachment.type)) {
                    flatAttachment.url = attachment.payload.url;
                }
                message.attachments.push(flatAttachment);
            }
        }
    }
    else if (entry.message && entry.message.is_echo) {
        message.type = 'message_echo';
    }
    else if (entry.delivery) {
        message.type = 'message_delivery';
    }
    else if (entry.read) {
        message.type = 'message_read';
    }
    else if (entry.postback) {
        message.type = 'postback';
        message.payload = entry.postback.payload;
        if (entry.postback.referral) {
            message.source = entry.postback.referral.source;
            message.referral_type = entry.postback.referral.type;
            if (entry.postback.referral.ref) {
                message.ref = entry.postback.referral.ref;
            }
            if (entry.postback.referral.ad_id) {
                message.ad_id = entry.postback.referral.ad_id;
            }
        }
    }
    else if (entry.account_linking) {
        message.type = 'account_linking';
        message.status = entry.account_linking.status;
        message.authorization_code = entry.account_linking.authorization_code;
    }
    else if (entry.referral) {
        message.type = 'referral';
        message.source = entry.referral.source;
        if (entry.referral.ref) {
            message.ref = entry.referral.ref;
        }
        if (entry.referral.ad_id) {
            message.ad_id = entry.referral.ad_id;
        }
        message.referral_type = entry.referral.type;
    }

    return message;
}

export default function ProcessIncoming(body, stickerMap = defaultStickerMap) {
    // Object ane entry are required
    validate.required(body, ['object', 'entry'], 'ProcessIncoming');
    // The object must be a page
    validate.oneOf(body.object, ['page'], 'body.object', 'ProcessIncoming');
    // Entry must be an array
    validate.isArray(body.entry, 'body.entry', 'ProcessIncoming');

    const normalizedEntries = {};

    // Iterate through the entries
    body.entry.forEach((entry) => {
        // Only allow messaging objects
        validate.required(entry, ['id'], 'ProcessIncoming');
        // Messaging must also be an array
        validate.isArray(entry.messaging || entry.standby, 'entry.messaging', 'ProcessIncoming');

        if (!normalizedEntries.hasOwnProperty(entry.id)) {
            normalizedEntries[entry.id] = [];
        }
        const entryPayload = entry.hasOwnProperty('messaging') ? entry.messaging : entry.standby;
        entryPayload.forEach((message) => {
            normalizedEntries[entry.id].push(ProcessMessage(message, stickerMap));
        });
    });

    return normalizedEntries;
}
