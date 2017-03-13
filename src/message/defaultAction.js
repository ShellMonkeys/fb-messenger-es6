import validate from '../util/validate';
import Button from './buttons/button';

export default class DefaultAction extends Button {
    constructor(url) {
        super('web_url');
        this.setUrl(url);
        return this;
    }

    setUrl(url) {
        validate.url(url, 'DefaultAction.setUrl');
        this.url = url;
        return this;
    }
}
