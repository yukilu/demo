import { Dispatcher } from 'flux';
import ListStore from '../store/ListStore';

const dispatcher = new Dispatcher();
dispatcher.register(function (action) {
    switch(action.actionType) {
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;
        default:
            //no op
    }
});

export default dispatcher;