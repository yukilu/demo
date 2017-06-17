import { Dispatcher } from 'flux';

import store from '../store/addButtonStore';

const dispatcher = new Dispatcher();
dispatcher.register(function (action) {
    switch (action.actionType) {
        case 'ADD':
            store.addNewItemHandler(action.text);
            store.emitChange();
            break;
        default:
            console.log('error');
    }
});

export default dispatcher;