import { UrlButton } from '../../message';
import validate from '../../util/validate';

export default class UrlMenuItem extends UrlButton {
    setTitle(title) {
        validate.stringLength(title, null, 30, 'title', 'PersistentMenu.UrlMenuItem.setTitle');
        this.title = title;
        return this;
    }
}
