import dispatcher from '../dispatcher/addButtonDispatcher';

const actions = {
    addNewItem(text) {
        dispatcher.dispatch({
            actionType: 'ADD',
            text: text
        });
    }
};

export default actions;