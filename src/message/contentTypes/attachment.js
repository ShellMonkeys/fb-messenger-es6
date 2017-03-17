import Message from '../message';
import validate from '../../util/validate';


class Attachment extends Message {
    constructor(type, url, attachmentId = null) {
        super();
        this.attachment = {
            type: type,
            payload: {},
        };
        if ((validate.empty(url) && validate.empty(attachmentId)) || (!validate.empty(url) && !validate.empty(attachmentId))) {
            throw new Error(`${this.constructor.name}.constructor: You need either url or attachment_id (not both)`);
        }
        this.setUrl(url);
        this.setAttachmentId(attachmentId);
        return this;
    }

    setUrl(url) {
        if (!validate.null(url)) {
            validate.isNull(this.attachment.payload.attachment_id, 'attachment_id', `${this.constructor.name}.setUrl`);
            validate.url(url, `${this.constructor.name}.setUrl`);
            this.attachment.payload.url = url;
        }
        return this;
    }

    setAttachmentId(id) {
        if (!validate.null(id)) {
            validate.isNull(this.attachment.payload.url, 'url', `${this.constructor.name}.setAttachmentId`);
            validate.isString(id, 'attachment_id', `${this.constructor.name}.setAttachmentId`);
            this.attachment.payload.attachment_id = id;
        }
        return this;
    }

    forUpload() {
        validate.required(this, 'attachment.payload.url', `${this.constructor.name}.forUpload`);
        this.attachment.payload.is_reusable = true;
        return this;
    }
}

export class AudioAttachment extends Attachment {
    constructor(url, attachmentId = null) {
        super('audio', url, attachmentId);
        return this;
    }
}

export class FileAttachment extends Attachment {
    constructor(url, attachmentId = null) {
        super('file', url, attachmentId);
        return this;
    }
}

export class ImageAttachment extends Attachment {
    constructor(url, attachmentId = null) {
        super('image', url, attachmentId);
        return this;
    }
}

export class VideoAttachment extends Attachment {
    constructor(url, attachmentId = null) {
        super('video', url, attachmentId);
        return this;
    }
}
