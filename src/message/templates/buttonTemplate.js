import validate from '../../util/validate';
import Template from './template';
import * as buttonTypes from '../buttons';


export default class ButtonTemplate extends Template {
    constructor(text, buttons) {
        super('button');
        this.setText(text);
        this.setButtons(buttons);
        return this;
    }

    validateButtons(buttons, max = 3) {
        validate.arrayLength(buttons, 1, max, 'buttons', 'ButtonTemplate.validateButtons');
        for (const button of buttons) {
            this.validateButton(button);
        }
        return this;
    }

    validateButton(button) {
        const validButtons = Object.keys(buttonTypes).filter(buttonType => buttonType !== 'ShareButton');
        validate.oneOf(button.constructor.name, validButtons, 'button.type', 'ButtonTemplate.validateButton');
        return this;
    }

    addButton(button) {
        this.validateButton(button);
        this.validateButtons(this.attachment.payload.buttons, 2);
        this.attachment.payload.buttons.push(button);
        return this;
    }

    setButtons(buttons) {
        this.validateButtons(buttons);
        this.attachment.payload.buttons = buttons;
        return this;
    }

    setText(text) {
        validate.stringLength(text, null, 640, 'text', 'ButtonTemplate.setText');
        this.attachment.payload.text = text;
        return this;
    }
}
