import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';
import { RoomActions } from '../reducers/room-reducer';
import { ChatMenuActions } from '../reducers/chat-menu-reducer';


export default class MessageForm extends React.Component {

    constructor() {
        super();
        this.messageRef = React.createRef();
    }

    sendMessage() {
        let text = this.messageRef.current.value;

        if(!text || text.length === 0) {
            return this.messageRef.current.focus();
        }

        this.props.sendMessage(text)
        this.messageRef.current.value = "";
        this.messageRef.current.focus();
    }

    onKeyPressHandler(e) {
        if(e.key === "Enter") {
            this.sendMessage();
        }
    }

    componentDidMount() {
        this.messageRef.current.focus();
    }

    render() {
        return (
        <div className="chat__message-form">
            <input ref={this.messageRef} type="text" className="chat__message-input" onKeyPress={this.onKeyPressHandler.bind(this)} placeholder="Write your message here"/>
            <input type="button" onClick={this.sendMessage.bind(this)} value="Send"/>
        </div>);
    }
}