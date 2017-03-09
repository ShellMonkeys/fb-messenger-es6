import Menu from './menu';
import validate from '../../util/validate';

const MAX = 5;

export default class NestedMenuItem extends Menu {
    constructor(title, menuItems) {
        super(menuItems);
        this.type = 'nested';
        this.setTitle(title);
        return this;
    }

    setTitle(title) {
        validate.stringLength(title, null, 30, 'title', 'PostbackMenuItem.setTitle');
        this.title = title;
        return this;
    }

    validateActions(menuItems) {
        super.validateActions(menuItems, MAX);
        return this;
    }

    addAction(menuItem) {
        super.addAction(menuItem, MAX);
        return this;
    }
}
