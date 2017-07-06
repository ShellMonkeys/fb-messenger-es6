import Button from './button';
import validate from '../../util/validate';
import GenericTemplate from '../templates/genericTemplate';

export default class ShareButton extends Button {
    constructor() {
        super('element_share');
        return this;
    }

    setContents(content) {
        validate.oneOf(content.constructor.name, [GenericTemplate.name], 'share_contents', 'ShareButton.setContents');
        // TODO: A generic template with up to one URL button
        this.share_contents = content.getMessage();
        return this;
    }
}
