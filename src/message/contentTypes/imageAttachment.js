import Message from '../message';
import validate from '../../util/validate';


export default class ImageMessage extends Message {
    constructor(url) {
        super();
        this.attachment = {
            type: 'image',
        };
        this.setUrl(url);
        return this;
    }

    setUrl(url) {
        validate.url(url, 'ImageMessage.setUrl');
        this.attachment.payload = {
            url: url,
        };
        return this;
    }
}
