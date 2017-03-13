import validate from '../../util/validate';
import Template from './template';
import { GenericElement } from '../element';

const MAX = 10;

export default class GenericTemplate extends Template {
    constructor(elements, aspectRatio = 'horizontal') {
        super('generic');
        this.setElements(elements);
        this.setImageAspectRatio(aspectRatio);
        return this;
    }

    setImageAspectRatio(aspectRatio) {
        validate.oneOf(aspectRatio, ['horizontal', 'square'], 'image_aspect_ratio', 'GenericTemplate.constructor');
        this.attachment.payload.image_aspect_ratio = aspectRatio;
        return this;
    }

    validateElements(elements, max = MAX) {
        validate.arrayLength(elements, 1, max, 'elements', 'GenericTemplate.validateElements');
        for (const element of elements) {
            this.validateElement(element);
        }
        return this;
    }

    validateElement(element) {
        validate.oneOf(element.constructor.name, GenericElement.name, 'element.type', 'GenericTemplate.validateElement');
        return this;
    }

    setElements(elements) {
        this.validateElements(elements);
        this.attachment.payload.elements = elements;
        return this;
    }

    addElement(element) {
        this.validateElement(element);
        this.validateElements(this.attachment.payload.elements, MAX - 1);
        this.attachment.payload.elements.push(element);
        return this;
    }
}
