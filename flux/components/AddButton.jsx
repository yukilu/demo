import R from 'react';

import actions from '../action/addButtonActions';
import store from '../store/addButtonStore'

class AddButton extends R.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: store.getItems()
        };

        this._onChange = this._onChange.bind(this);
    }
    _onChange() {
        this.setState({
            items: store.getItems()
        });
    }
    componentDidMount() {
        store.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        store.removeChangeListener(this._onChange);
    }
    addNewItem(e) {
        actions.addNewItem(store.num);
    }
    render() {
        const items = this.state.items.map((item, index) => <li key={item}>{item}</li>);
        return (
            <div>
                <ul>{items}</ul>
                <button onClick={ this.addNewItem }>Add</button>
            </div>
        );
    }
}

export default AddButton;