import validate from '../../util/validate';
import Button from './button';

export default class CallButton extends Button {
    constructor(title, phoneNumber) {
        super('phone_number');
        this.setTitle(title);
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 20, 'title', 'CallButton.setTitle');
        this.title = title;
        return this;
    }

    setPhoneNumber(payload) {
        validate.stringLength(payload, 12, 20, 'payload', 'CallButton.setPhoneNumber');
        if (!new RegExp(/\+[0-9]{11,}$/g).test(payload)) {
            throw new Error('CallButton.setPhoneNumber - Format must have "+" prefix followed by the country code, area code and local number');
        }
        this.payload = payload;
        return this;
    }
}
