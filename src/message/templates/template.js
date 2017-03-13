import Message from '../message';
import validate from '../../util/validate';

const validTemplates = [
    'button',
    'generic',
    'list',
    'receipt',
];

export default class Template extends Message {
    constructor(type) {
        super();
        validate.oneOf(type, validTemplates, 'template_type', 'Template.constructor');
        this.attachment = {
            type: 'template',
            payload: {
                template_type: type,
            },
        };
        return this;
    }
}
