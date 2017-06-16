import { Dispatcher } from 'flux';

import numStore from '../store/numStore';

const dispatcher = new Dispatcher();
dispatcher.register(function (action) {
    switch(action.type) {
        case 'ADD_NEW_ITEM':
            numStore.addNewItemHandler(action.text);
            numStore.emitChange();
            break;
        case 'REMOVE_ITEM':
            numStore.removeItemHandler();
            numStore.emitChange();
            break;
        default:
            console.log('error');
    }
});

export default dispatcher;