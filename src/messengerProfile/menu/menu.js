import validate from '../../util/validate';

export default class Menu {
    constructor(menuItems) {
        this.setActions(menuItems);
        return this;
    }

    validateActions(menuItems, max = 3) {
        validate.arrayLength(menuItems, 1, max, 'call_to_actions', `${this.constructor.name}.validateActions`);
        for (const action of menuItems) {
            this.validateAction(action);
        }
        return this;
    }

    validateAction(menuItem) {
        validate.oneOf(menuItem.type, ['web_url', 'postback', 'nested'], 'action.type', `${this.constructor.name}.validateAction`);
        return this;
    }

    setActions(actions) {
        this.validateActions(actions);
        this.call_to_actions = actions;
        return this;
    }

    addAction(menuItem, max = 3) {
        this.validateActions(this.call_to_actions, max - 1);
        this.call_to_actions.push(menuItem);
        return this;
    }
}
