import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';

class MessageForm extends React.Component {

    constructor() {
        super();
        this.messageRef = React.createRef();
    }

    sendMessage() {
        let text = this.messageRef.current.value;

        if(!text || text.length === 0) {
            return;
        }

        this.props.sendMessage(text)
    }

    render() {
        return (
        <div className="chat__message-form">
            <input ref={this.messageRef} type="text" className="chat__message-input" placeholder="Write your message here"/>
            <input type="button" onClick={this.sendMessage.bind(this)} value="Send"/>
        </div>);
    }
}

class Chat extends React.Component {

    constructor() {
        super();
        this.intervalId = -1;
    }

    componentWillMount() {
        this.intervalId = setInterval(this.requestNewMessages.bind(this), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    requestNewMessages() {
        this.props.dispatchRequestMessage(this.props.roomId)
    }

    render() {

        let messages = (this.props.messages || []).map(value => {
            return (<div className="chat__message" key={value._id}>{value.text}</div>)
        })

        return (
            <div className="chat">
                <div className="chat__messages">{messages}</div>
                <MessageForm sendMessage={text => this.props.sendMessage(this.props.roomId, this.props.userId, text)}></MessageForm>
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
    })
})

const mapStateToProps = state => ({
    roomId: state.room.id,
    userId: state.auth._id,
    messages: state.chat.messages,
    sendingMessage: state.chat.sending
})

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Chat));