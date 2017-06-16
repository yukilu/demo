function MyButton(props) {
    return <button onClick={props.onClick}>{props.type}</button>;
}

export default MyButton;