import validate from '../../util/validate';
import Template from './template';
import { ListElement } from '../element';
import * as buttonTypes from '../buttons';

export default class ListTemplate extends Template {
    // while the style is not madatory, FB defaults its to large
    // the faster validation is called the easier it is for everyone
    constructor(elements, style = 'large') {
        super('list');
        this.setElements(elements);
        this.setTopElementStyle(style);
        return this;
    }

    setTopElementStyle(style) {
        validate.oneOf(style, ['large', 'compact'], 'top_element_style', 'ListTemplate.setTopElementStyle');
        this.validateTopElement(style);
        this.state.attachment.payload.top_element_style = style;
        return this;
    }

    validateTopElement(style) {
        if (style === 'large') {
            const firstElement = this.state.attachment.payload.elements[0];
            if (validate.null(firstElement.image_url)) {
                throw new Error('ListTemplate.setTopElementStyle: image_url is required for the first element if top_element_style is large or not specified');
            }
        }
        return this;
    }

    validateElements(elements, max = 4) {
        validate.arrayLength(elements, 2, max, 'elements', 'ListTemplate.validateElements');
        for (const element of elements) {
            this.validateElement(element);
        }
        return this;
    }

    validateElement(element) {
        validate.oneOf(element.constructor.name, ListElement.name, 'element.type', 'ListTemplate.validateElements');
        if ((validate.null(element.subtitle)) && validate.null(element.image_url) && validate.null(element.buttons)) {
            throw new Error('ListTemplate.validateElement: title and at least one other field (image_url, subtitle or buttons) is required with non-empty value');
        }
        return this;
    }

    setElements(elements) {
        this.validateElements(elements);
        this.state.attachment.payload.elements = elements;
        return this;
    }

    addElement(element) {
        this.validateElement(element);
        this.validateElements(this.state.attachment.payload.elements, 3);
        this.state.attachment.payload.elements.push(element);
        return this;
    }

    validateButtons(buttons) {
        validate.arrayLength(buttons, 1, 1, 'buttons', 'ListTemplate.validateButtons');
        const validButtons = Object.keys(buttonTypes).filter(buttonType => buttonType !== 'ShareButton');
        for (const button of buttons) {
            validate.oneOf(button.constructor.name, validButtons, 'button.type', 'ListTemplate.validateButtons');
        }
        return this;
    }

    setButtons(buttons) {
        this.validateButtons(buttons);
        this.state.attachment.payload.buttons = buttons;
        return this;
    }
}
