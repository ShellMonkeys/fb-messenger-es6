import validate from '../../util/validate';
import Button from './button';

export default class PostbackButton extends Button {
    constructor(title, payload) {
        super('postback');
        this.setTitle(title);
        this.setPayload(payload);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 20, 'title', 'PostbackButton.setTitle');
        this.title = title;
        return this;
    }

    setPayload(payload) {
        validate.stringLength(payload, null, 1000, 'payload', `${this.constructor.name}.setPayload`);
        this.payload = payload;
        return this;
    }
}
