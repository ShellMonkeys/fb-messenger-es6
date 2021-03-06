import validate from '../util/validate';
import DefaultAction from './defaultAction';

class Element {
    constructor(title) {
        this.setTitle(title);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 80, 'title', 'Element.setTitle');
        this.title = title;
        return this;
    }

    setSubTitle(subtitle) {
        validate.stringLength(subtitle, null, 80, 'subtitle', 'Element.setSubTitle');
        this.subtitle = subtitle;
        return this;
    }

    setImageUrl(imageUrl) {
        this.image_url = imageUrl;
        return this;
    }

    setDefaultAction(defaultAction) {
        validate.oneOf(defaultAction.constructor.name, [DefaultAction.name], 'default_action', `${this.constructor.name}.setDefaultAction`);
        this.default_action = defaultAction;
        return this;
    }

    setButtons(buttons) {
        this.buttons = buttons;
        this.validateButtons();
        return this;
    }
}

export class GenericElement extends Element {
    validateButtons() {
        validate.arrayLength(this.buttons, 1, 3, 'buttons', 'Element.validateButtons');
        // TODO: check that if button.type === 'ShareButton' then there's only one other button with type === web_url
    }

    addButton(button) {
        if (!this.buttons) {
            this.buttons = [];
        }
        this.buttons.push(button);
        this.validateButtons();
        return this;
    }
}

export class ListElement extends Element {
    validateButtons() {
        validate.arrayLength(this.buttons, 1, 1, 'buttons', 'Element.validateButtons');
    }
}

export class ReceiptElement extends Element {
    constructor(title, price = 0) {
        super(title);
        this.setPrice(price);
        return this;
    }

    setQuantity(quantity) {
        validate.isNumber(quantity, 'quantity', 'ReceiptElement.setQuantity');
        this.quantity = quantity;
        return this;
    }

    setPrice(price) {
        validate.isNumber(price, 'price', 'ReceiptElement.setPrice');
        this.price = price;
        return this;
    }

    setCurrency(currency) {
        validate.isString(currency, 'currency', 'ReceiptElement.setCurrency');
        this.currency = currency;
        return this;
    }

    setImageUrl(url) {
        validate.url(url, 'ReceiptElement.setImageUrl');
        this.image_url = url;
        return this;
    }
}
