import React from 'react'
import requireAuth from './RequireAuth'

 class Lobby extends React.Component {

    constructor() {
        super();
        this.roomIdRef = React.createRef();
    }

    joinRoom(newRoom = false) {
        const roomId = newRoom ? undefined : this.roomIdRef.current.value;
        this.props.requestJoinRoom(roomId)
    }

    render() {
        return (
            <React.Fragment>
                <input type="button" value="Create new room" onClick={() => this.joinRoom(true)}/>
                <input type="text" ref={this.roomIdRef}/>
                <input type="button" value="Join room" onClick={() => this.joinRoom(false)}/>
            </React.Fragment>
        )
    }

}

export default requireAuth(Lobby)