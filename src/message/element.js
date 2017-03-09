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
    validateButtons(max = 3) {
        validate.arrayLength(this.buttons, 1, max, 'buttons', 'Element.validateButtons');
        // TODO: check that if button.type === 'ShareButton' then there's only one other button with type === web_url
    }

    addButton(button) {
        if (!this.buttons) {
            this.buttons = [];
        }
        this.buttons.push(button);
        this.validateButtons(3);
        return this;
    }
}

export class ListElement extends Element {
    validateButtons() {
        validate.arrayLength(this.buttons, 1, 1, 'buttons', 'Element.validateButtons');
    }
}
