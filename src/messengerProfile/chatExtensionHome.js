import validate from '../util/validate';

export default class ChatExtensionHomeUrl {
    constructor(url, test) {
        this.setUrl(url);
        this.setWebviewHeightRatio('tall');
        this.setInTest(test);
        return this;
    }

    setUrl(url) {
        validate.url(url, 'ChatExtensionHomeUrl.setPrivacyUrl');
        this.url = url;
        return this;
    }

    setWebviewHeightRatio(height) {
        validate.oneOf(height, ['tall'], 'webview_height_ratio', `${this.constructor.name}.setWebviewHeightRatio`);
        this.webview_height_ratio = height;
        return this;
    }

    setShareStatus(status = 'hide') {
        validate.oneOf(status, ['show', 'hide'], 'webview_share_button', `${this.constructor.name}.setShareStaus`);
        this.webview_share_button = status;
        return this;
    }

    setInTest(test) {
        validate.isBoolean(test, 'in_test', 'ChatExtensionHomeUrl.setInTest');
        this.in_test = test;
        return this;
    }
}
