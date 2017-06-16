import dispatcher from '../dispatcher/numDispatcher';

const numActions = {
    num: 0,
    addNewItem() {
        dispatcher.dispatch({
            type: 'ADD_NEW_ITEM',
            text: this.num++
        });
    },
    removeItem() {
        dispatcher.dispatch({
            type: 'REMOVE_ITEM'
        });
    }
};

export default numActions;