import React from "react";
import { StaticRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { Provider , connect} from 'react-redux';
import Chat from './Chat';
import Lobby from "../components/Lobby"
import LoginForm from '../components/LoginForm';
import { UserActions } from '../reducers/auth-reducer';
import { RoomActions } from "../reducers/room-reducer";
import RegistrationForm from "../components/RegistrationForm";
import { TransitionGroup, CSSTransition, SwitchTransition } from 'react-transition-group';

const transProps = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
}



class App extends React.Component {

    

    render() {
        let strippedPage = /(login|register)/i.test(this.props.history.location.pathname);
        let location = this.props.location;
        let renderLogin = props => (            
            <LoginForm requestLogin={this.props.requestLogin}></LoginForm>
        )
     
        let renderSignUp = props => (
            <RegistrationForm requestRegistration={this.props.requestRegistration}></RegistrationForm>
        )

        let renderMain = props => {
            if (this.props.roomId) {
                console.log("rendering CHAT")
                console.log(this.props.roomId)
                return (<Chat></Chat>)
            } else {
                console.log("LOBY")
                return (<Lobby username={this.props.username} requestJoinRoom={this.props.requestJoinRoom}></Lobby>)
            }
        }
        

        const routes = {
            "/login" : renderLogin.bind(this),
            "/register": renderSignUp.bind(this),
            "/" : renderMain.bind(this)
        }

        const routesRendered = Object.entries(routes).map(([path, renderer]) => {
            const wrapped = props => (
                <CSSTransition
                        in={this.props.match != null}
                        key={location.key}
                        timeout={500}
                        classNames={'fade'}>
                        {renderer(props)}
                </CSSTransition>
            );

            return (<Route exact key={path} path={path} render={wrapped}></Route>)
        })

        
        return (
            <React.Fragment>  
                <SwitchTransition timeout={500} style={{width: "100%", height: "100%"}}>                       
                    <Switch>
                        {routesRendered}
                    </Switch>
                </SwitchTransition>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => (console.log(state), {
    roomId: state.room.id,
    username: state.auth.username
});

let dispatchToProps = dispatch => ({
    requestLogin: (username, password) => 
        dispatch({type: UserActions.LOGIN_REQUEST, payload: {username, password}}),
    requestRegistration: (username, password) =>
        dispatch({type: UserActions.SIGNUP_REQUEST, payload: {username, password}}),
    requestJoinRoom: roomId => 
        dispatch({ type: RoomActions.JOIN_REQUEST, payload: { roomId }})
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(App))