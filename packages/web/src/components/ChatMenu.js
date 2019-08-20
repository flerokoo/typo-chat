import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';
import { RoomActions } from '../reducers/room-reducer';
import { ChatMenuActions } from '../reducers/chat-menu-reducer';


export default class ChatMenu extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="chat__menu">
                <div style={{"color": "white", "textAlign": "center"}}>
                    Room #{this.props.roomId}
                </div>
                <div className="chat__menu-separator"></div>
                <input type="button" className="chat__menu-list-button" value="Leave room" onClick={this.props.exitRoom}/>
                <div className="chat__menu-separator"></div>
            </div>
        );
    }
}