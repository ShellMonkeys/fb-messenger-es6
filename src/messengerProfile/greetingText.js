import validate from '../util/validate';
import supportedLocales from '../util/locales';

export default class GreetingText {
    constructor(text, locale = 'default') {
        this.setLocale(locale);
        this.setText(text);
        return this;
    }

    setLocale(locale) {
        validate.oneOf(locale, supportedLocales, 'locale', 'GreetingText.setLocale');
        this.locale = locale;
        return this;
    }

    setText(text) {
        validate.stringLength(text, null, 160, 'text', 'GrettingText.setText');
        this.text = text;
        return this;
    }
}
