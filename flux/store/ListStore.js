import { EventEmitter } from 'events';

const ListStore = Object.assign({}, EventEmitter.prototype, {
    items: [],
    getAll() {
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

export default ListStore;