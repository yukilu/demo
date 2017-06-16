import R from 'react';

import MyButton from './MyAnotherButton';
import numActions from '../action/numActions';
import numStore from '../store/numStore';

class NumButton extends R.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: numStore.getAll()
        };

        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        numStore.addChangeListener(this._onChange);
    }
    componentWillUnmout() {
        numStore.removeChangeListener(this._onChange);
    }
    addNewItem(e) {
        numActions.addNewItem();
    }
    removeItem(e) {
        numActions.removeItem();
    }
    _onChange() {
        this.setState({
            items: numStore.getAll()
        });
    }
    render() {
        let items = this.state.items.map((item, index) => <li key={item}>{item}</li>);
        return (
            <div>
                <ul>{items}</ul>
                <MyButton onClick={ this.addNewItem } type="add" />
                <MyButton onClick={ this.removeItem } type="remove" />
            </div>
        );
    }
}

export default NumButton;