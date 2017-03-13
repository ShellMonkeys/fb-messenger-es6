import Message from '../message';
import validate from '../../util/validate';


class Attachment extends Message {
    constructor(type, url) {
        super();
        this.attachment = {
            type: type,
        };
        this.setUrl(url);
        return this;
    }

    setUrl(url) {
        validate.url(url, `${this.constructor.name}.setUrl`);
        this.attachment.payload = {
            url: url,
        };
        return this;
    }
}

export class AudioAttachment extends Attachment {
    constructor(url) {
        super('audio', url);
        return this;
    }
}

export class FileAttachment extends Attachment {
    constructor(url) {
        super('file', url);
        return this;
    }
}

export class ImageAttachment extends Attachment {
    constructor(url) {
        super('image', url);
        return this;
    }
}

export class VideoAttachment extends Attachment {
    constructor(url) {
        super('video', url);
        return this;
    }
}
