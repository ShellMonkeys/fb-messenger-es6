import validate from '../util/validate';

const MAX_QR = 11;

export default class Message {
    constructor() {
        return this;
    }

    getMessage() {
        if ((this.text && this.attachment) || (!this.text && !this.attachment)) {
            throw new Error(`${this.constructor.name}.getMessage: You cannot send a text and an attachment together, please read the Send API Reference for more details`);
        }

        return { ...this };
    }

    validateQuickReplies(quickReplies, max = MAX_QR) {
        validate.arrayLength(quickReplies, null, max, 'quick_replies', 'Message.validateQuickReplies');
        return this;
    }

    setQuickReplies(quickReplies) {
        this.validateQuickReplies(quickReplies);
        this.quick_replies = quickReplies;
        return this;
    }

    addQuickReply(quickReply) {
        if (!this.quick_replies) {
            this.quick_replies = [];
        }
        this.validateQuickReplies(this.quick_replies, MAX_QR - 1);

        this.quick_replies.push(quickReply);
        return this;
    }
}
