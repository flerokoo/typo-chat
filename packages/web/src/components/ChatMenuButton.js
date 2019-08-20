import requireAuth from '../components/RequireAuth';
import React from 'react';
import { connect } from 'react-redux'
import { MessageActions } from '../reducers/messages-reducer';
import { RoomActions } from '../reducers/room-reducer';
import { ChatMenuActions } from '../reducers/chat-menu-reducer';


export default props => {
    return (
        <button className="chat__menu-button" onClick={props.toggleChatMenu}>
            Menu
        </button>
    )
}