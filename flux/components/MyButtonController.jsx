import R from 'react';

import ButtonActions from '../action/ButtonActions';
import ListStore from '../store/ListStore';
import MyButton from './MyButton';

class MyButtonController extends R.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: ListStore.getAll()
        }

        this._onChange = this._onChange.bind(this);
    }
    componentDidMount() {
        ListStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
        ListStore.removeChangeListener(this._onChange);
    }
    _onChange() {
        this.setState({
            items: ListStore.getAll()
        });
    }
    createNewItem(e) {
        ButtonActions.addNewItem('new item');
    }
    render() {
        return <MyButton items={ this.state.items } onClick={ this.createNewItem } />;
    }
}

export default MyButtonController;