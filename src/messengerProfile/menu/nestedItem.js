import Menu from './menu';
import validate from '../../util/validate';

const MAX = 5;

export default class NestedMenuItem extends Menu {
    constructor(title, menuItems) {
        super(menuItems);
        this.setTitle(title);
    }

    setTitle(title) {
        validate.stringLength(title, null, 30, 'title', 'PostbackMenuItem.setTitle');
        this.title = title;
        return this;
    }

    validateActions(menuItems) {
        this.type = 'nested';
        super.validateActions(menuItems, MAX);
        return this;
    }

    addAction(menuItem) {
        super.addAction(menuItem, MAX);
        return this;
    }
}
