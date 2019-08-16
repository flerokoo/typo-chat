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
        console.log(this.props)
        return (
            <React.Fragment>
                <div className="megaform">
                    <div className="megaform__title">
                        Hello, {this.props.username}!
                    </div>
                    <div className="megaform__inner">
                       
                        <div className="megaform__row">
                            <input type="text" placeholder="Enter room ID" ref={this.roomIdRef}/>
                        </div>
                        <div className="megaform__row">
                            <input type="button" value="Join room" onClick={() => this.joinRoom(false)}/>
                        </div>
                        <div className="megaform__row">
                            <input type="button" value="Create new room" onClick={() => this.joinRoom(true)}/>
                        </div>
                        <div className="megaform__row">
                            <input type="button" className="red" value="Log out" onClick={() => window.location.href = "/api/users/logout"}/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default requireAuth(Lobby)