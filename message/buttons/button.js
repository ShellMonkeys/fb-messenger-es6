import validate from '../../util/validate';

const validButtonTypes = ['web_url', 'postback', 'phone_number', 'element_share', 'account_link', 'account_unlink'];

export default class Button {
    constructor(type) {
        this.setType(type);
        return this;
    }

    setType(type) {
        validate.oneOf(type, validButtonTypes, 'type', 'Button.setType');
        this.type = type;
        return this;
    }
}
