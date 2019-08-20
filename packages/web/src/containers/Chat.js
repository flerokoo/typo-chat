import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';
import { RoomActions } from '../reducers/room-reducer';
import { ChatMenuActions } from '../reducers/chat-menu-reducer';
import ChatMenuButton from '../components/ChatMenuButton';
import MessageForm from '../components/MessageForm';
import ChatMenu from '../components/ChatMenu';





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
            <div className={"chat " + (this.props.menuOpen ? "chat--menu-visible" : "")}>
                <ChatMenuButton toggleChatMenu={this.props.toggleChatMenu}></ChatMenuButton>
                <div className="chat__top">
                    <ChatMenu roomId={this.props.roomId} exitRoom={this.exitRoom.bind(this)}></ChatMenu>
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
    exitRoom: () => dispatch({ type: RoomActions.EXIT }),
    toggleChatMenu: () => dispatch({ type: ChatMenuActions.TOGGLE })
})

const mapStateToProps = state => ({
    roomId: state.room.id,
    userId: state.auth._id,
    messages: state.chat.messages,
    sendingMessage: state.chat.sending,
    menuOpen: state.chatMenu.open
})

export default connect(mapStateToProps, mapDispatchToProps)(requireAuth(Chat));