import validate from '../util/validate';

const MAX_QR = 11;

export default class Message {
    constructor() {
        this.state = {};
        return this;
    }

    getMessage() {
        if ((this.state.text && this.state.attachment) || (!this.state.text && !this.state.attachment)) {
            throw new Error(`${this.constructor.name}.getMessage: You cannot send a text and an attachment together, please read the Send API Reference for more details`);
        }

        return { ...this.state };
    }

    validateQuickReplies(quickReplies, max = MAX_QR) {
        validate.arrayLength(quickReplies, null, max, 'quick_replies', 'Message.validateQuickReplies');
        return this;
    }

    setQuickReplies(quickReplies) {
        this.validateQuickReplies(quickReplies);
        this.state.quick_replies = quickReplies;
        return this;
    }

    addQuickReply(quickReply) {
        if (!this.state.quick_replies) {
            this.state.quick_replies = [];
        }
        this.validateQuickReplies(this.state.quick_replies, MAX_QR - 1);

        this.state.quick_replies.push(quickReply);
        return this;
    }
}
