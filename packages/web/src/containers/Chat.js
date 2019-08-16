import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';
import { RoomActions } from '../reducers/room-reducer';

class MessageForm extends React.Component {

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

class Chat extends React.Component {

    constructor() {
        super();
        this.intervalId = -1;
    }

    componentDidMount() {
        this.intervalId = setInterval(this.requestNewMessages.bind(this), 250);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    requestNewMessages() {
        this.props.dispatchRequestMessage(this.props.roomId)
    }

    exitRoom() {
        this.props.exitRoom()
    }

    render() {
        let prevAuthor = 0;

        let messages = (this.props.messages || []).map( (value, i, messages) => {

            const isSelf = value.author === this.props.userId;
            const printAuthor = i === messages.length - 1 || messages[i+1].author !== value.author;

            const messageClass = ["chat__message"];

            if (isSelf) messageClass.push("chat__message--my");

            if (printAuthor) messageClass.push("chat__message--show-author");

            prevAuthor = value.author;

            return (
                <div className={messageClass.join(" ")} key={value._id}>            
                    <div className="chat__message__author">{value.author}</div>            
                    <div className="chat__message__text">{value.text}</div>            
                </div>)
        })

        return (
            <div className="chat">
                <div className="chat__top">
                    <div className="chat__menu">
                        Menu
                        <input type="button" value="Exit room" onClick={this.exitRoom.bind(this)}/>
                    </div>
                    <div className="chat__messages">
                        {messages}
                    </div>
                </div>
                <div className="chat__bottom">
                    <MessageForm sendMessage={text => this.props.sendMessage(this.props.roomId, this.props.userId, text)}></MessageForm>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatchRequestMessage: roomId => dispatch({
        type: MessageActions.GET_MESSAGE_REQUEST,
        payload: { roomId }
    }),
    sendMessage: (roomId, userId, text) => dispatch({
        type: MessageActions.SEND_MESSAGE_REQUEST,
        payload: { roomId, userId, text }
    }),
    exitRoom: () => dispatch({ type: RoomActions.EXIT })
})

const mapStateToProps = state => ({
    roomId: state.room.id,
    userId: state.auth._id,
    messages: state.chat.messages,
    sendingMessage: state.chat.sending
})

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Chat));