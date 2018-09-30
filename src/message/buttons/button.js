import validate from '../../util/validate';

export const BUTTON_TYPES = {
  WEB_URL: 'web_url',
  POSTBACK: 'postback',
  PHONE_NUMBER: 'phone_number',
  ELEMENT_SHARE: 'element_share',
  ACCOUNT_LINK: 'account_link',
  ACCOUNT_UNLINK: 'account_unlink',
};

export default class Button {
    constructor(type) {
        this.setType(type);
        return this;
    }

    setType(type) {
        validate.oneOf(type, BUTTON_TYPES, 'type', 'Button.setType');
        this.type = type;
        return this;
    }
}
