import { PostbackButton } from '../../message';
import validate from '../../util/validate';

export default class PostbackMenuItem extends PostbackButton {
    constructor(title, payload) {
        super(title, payload);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 30, 'title', 'PostbackMenuItem.setTitle');
        this.title = title;
        return this;
    }
}
