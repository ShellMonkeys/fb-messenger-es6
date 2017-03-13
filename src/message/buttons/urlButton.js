import validate from '../../util/validate';
import Button from './button';

export default class UrlButton extends Button {
    constructor(title, url, heightRatio = 'full') {
        super('web_url');
        this.setTitle(title);
        this.setUrl(url);
        this.setWebviewHeightRatio(heightRatio);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 20, 'title', `${this.constructor.name}.setTitle`);
        this.title = title;
        return this;
    }

    setUrl(url) {
        validate.url(url, `${this.constructor.name}.setUrl`);
        this.url = url;
        return this;
    }

    setWebviewHeightRatio(height) {
        validate.oneOf(height, ['comapact', 'tall', 'full'], 'webview_height_ratio', `${this.constructor.name}.setWebviewHeightRatio`);
        this.webview_height_ratio = height;
        return this;
    }

    setFallbackUrl(fallbackUrl) {
        validate.url(fallbackUrl, `${this.constructor.name}.setFallbackUrl`);
        this.messenger_extensions = true;
        this.fallback_url = fallbackUrl;
        return this;
    }

    disableSharing() {
        this.webview_share_button = 'hide';
    }
}
