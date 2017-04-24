import validate from '../util/validate';

class QuickReply {
    constructor(contentType) {
        this.setType(contentType);
        return this;
    }

    setType(type) {
        validate.oneOf(type, ['text', 'location'], 'content_type', 'QuickReply.setType');
        this.content_type = type;
    }
}

export class LocationQuickReply extends QuickReply {
    constructor() {
        super('location');
        return this;
    }
}

export class TextQuickReply extends QuickReply {
    constructor(title, payload) {
        super('text');
        this.setTitle(title);
        this.setPayload(payload || title);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 20, 'title', 'TextQuickReply.setTitle');
        this.title = title;
        return this;
    }

    setPayload(payload) {
        validate.stringLength(payload, null, 1000, 'payload', 'TextQuickReply.setPayload');
        this.payload = payload;
        return this;
    }

    setImageUrl(imageUrl) {
        validate.url(imageUrl, 'TextQuickReply.setImageUrl');
        this.image_url = imageUrl;
        return this;
    }
}
