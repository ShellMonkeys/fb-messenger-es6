import Button from './button';
import validate from '../../util/validate';

export default class ShareButton extends Button {
    constructor() {
        super('element_share');
        return this;
    }

    setContents(content) {
        validate.notNull(content, 'share_contents', 'ShareButton.setContents');
        this.share_contents = content;
    }
}
