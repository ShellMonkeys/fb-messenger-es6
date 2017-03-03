import Message from '../message';
import validate from '../../util/validate';

export default class Template extends Message {
    constructor(type) {
        super();
        validate.oneOf(type, ['button', 'generic', 'list'], 'template_type', 'Template.constructor');
        this.attachment = {
            type: 'template',
            payload: {
                template_type: type,
            },
        };
        return this;
    }
}
