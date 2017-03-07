import Menu from './menu';
import validate from '../../util/validate';
import supportedLocales from '../../util/locales';

const MAX = 3;

export default class PersistentMenu extends Menu {
    constructor(menuItems, locale = 'default', disableUserInput = true) {
        super(menuItems);
        this.setLocale(locale);
        this.disableUserInput(disableUserInput);
        return this;
    }

    validateActions(menuItems) {
        if (!validate.isNull(menuItems)) {
            super.validateActions(menuItems, MAX);
        }
        // TODO: You can have at most 3 hierarchical levels of menu_item
        return this;
    }

    addAction(menuItem) {
        super.addAction(menuItem, MAX);
        return this;
    }

    setLocale(locale) {
        validate.oneOf(locale, supportedLocales, 'locale', 'PersistentMenu.setLocale');
        this.locale = locale;
        return this;
    }

    disableUserInput(disable) {
        this.composer_input_disabled = disable;
        return this;
    }
}
