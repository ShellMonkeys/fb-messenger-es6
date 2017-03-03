import Message from '../message';
import validate from '../../util/validate';


export default class ImageMessage extends Message {
    constructor(url) {
        super();
        this.attachment = {};
        this.setType('image');
        this.setUrl(url);
        return this;
    }

    setUrl(url) {
        validate.url(url, 'ImageMessage.setUrl');
        if (!this.attachment.payload) {
            this.attachment.payload = {};
        }

        this.attachment.payload.url = url;
        return this;
    }

    setType(type) {
        validate.isString(type, 'type', 'ImageMessage.setType');
        this.attachment.type = type;
        return this;
    }
}
