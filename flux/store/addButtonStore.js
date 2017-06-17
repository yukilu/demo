import { EventEmitter } from 'events';

let $n = 0;
const store = {
    get num() {
        return $n++;
    }
};

Object.assign(store, EventEmitter.prototype, {
    items: [],
    getItems() {
        return this.items;
    },
    addNewItemHandler(text) {
        this.items.push(text);
    },
    emitChange() {
        this.emit('change');
    },
    addChangeListener(callback) {
        this.on('change', callback);
    },
    removeChangeListener(callback) {
        this.removeListener('change', callback);
    }
});

export default store;