import Menu from './menu';
import validate from '../../util/validate';
import supportedLocales from '../../util/locales';

const MAX = 3;

export default class PersistentMenu extends Menu {
    constructor(menuItems, locale = 'default', disableUserInput = false) {
        super(menuItems);
        this.setLocale(locale);
        this.disableUserInput(disableUserInput);
        return this;
    }

    setActions(actions) {
        if (!validate.null(actions)) {
            this.validateActions(actions, MAX);
            this.call_to_actions = actions;
        }
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
