import Button from './button';
import validate from '../../util/validate';

export class LogInButton extends Button {
    constructor(url) {
        super('account_link');
        this.setUrl(url);
        return this;
    }

    setUrl(url) {
        validate.url(url, `${this.constructor.name}.setUrl`);
        // TODO: need to validate that this is using htps protocol
        this.url = url;
        return this;
    }
}

export class LogOutButton extends Button {
    constructor() {
        super('account_unlink');
        return this;
    }
}
