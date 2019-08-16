import React from "react";
import { StaticRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { Provider , connect} from 'react-redux';
import Chat from './Chat';
import Lobby from "../components/Lobby"
import LoginForm from '../components/LoginForm';
import { UserActions } from '../reducers/auth-reducer';
import { RoomActions } from "../reducers/room-reducer";

class App extends React.Component {
    render() {
        let strippedPage = /(login|register)/i.test(this.props.history.location.pathname);
     
        let renderLogin = props => (
            <LoginForm requestLogin={this.props.requestLogin}></LoginForm>
        )

        let renderMain = props => {
            if (this.props.roomId) {
                console.log(this.props.roomId)
                return (<Chat></Chat>)
            } else {
                return (<Lobby username={this.props.username} requestJoinRoom={this.props.requestJoinRoom}></Lobby>)
            }
        }

        return (
            <React.Fragment>        
                <Switch>
                    <Route exact path="/" render={renderMain} />
                    <Route exact path="/login" render={renderLogin}/>
                </Switch>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => ( {
    roomId: state.room.id,
    username: state.auth.username
});

let dispatchToProps = dispatch => ({
    requestLogin: (username, password) => 
        dispatch({type: UserActions.LOGIN_REQUEST, payload: {username, password}}),
    requestJoinRoom: roomId => 
        dispatch({ type: RoomActions.JOIN_REQUEST, payload: { roomId }})
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(App))