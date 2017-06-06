import validate from '../../util/validate';
import Message from '../message';

export default class TextMessage extends Message {
    constructor(text) {
        super();
        this.setText(text);
        return this;
    }

    setText(text) {
        validate.stringLength(text, null, 640, 'text', 'TextMessage.setText');
        this.state.text = text;
        return this;
    }
}
