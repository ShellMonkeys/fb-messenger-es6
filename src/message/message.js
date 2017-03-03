import validate from '../util/validate';

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

    validateQuickReply(max = 11) {
        if (this.quick_replies) {
            validate.arrayLength(this.quick_replies, null, max, 'quick_replies', 'Message.validateQuickReply');
        }
    }

    addQuickReply(quickReply) {
        if (!this.quick_replies) {
            this.quick_replies = [];
        }
        this.validateQuickReply(10);

        this.quick_replies.push(quickReply);
        return this;
    }
}
