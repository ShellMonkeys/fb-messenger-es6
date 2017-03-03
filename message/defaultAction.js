import validate from '../util/validate';
import Button from './buttons/button';

export default class DefaultAction extends Button {
    constructor(url, heightRatio = 'full') {
        super('web_url');
        this.setUrl(url);
        this.setWebviewHeightRatio(heightRatio);
        return this;
    }

    setUrl(url) {
        validate.url(url, 'DefaultAction.setUrl');
        this.url = url;
        return this;
    }

    setWebviewHeightRatio(height) {
        validate.oneOf(height, ['compact', 'tall', 'full'], 'webview_height_ratio', 'DefaultAction.setWebviewHeightRatio');
        this.webview_height_ratio = height;
        return this;
    }

    disableSharing() {
        this.webview_share_button = 'hide';
    }
}
