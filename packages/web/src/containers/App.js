import React from "react";
import { StaticRouter as Router, Route, Link, Switch, withRouter } from 'react-router-dom';
import { Provider , connect} from 'react-redux';
import Chat from './Chat';
import LoginForm from '../components/LoginForm';
import { UserActions } from '../reducers/auth-reducer';

class App extends React.Component {
    render() {
        let strippedPage = /(login|register)/i.test(this.props.history.location.pathname);
     
        let renderLogin = props => (
            <LoginForm requestLogin={this.props.requestLogin}></LoginForm>
        )

        return (
            <React.Fragment>        
                <Switch>
                    <Route exact path="/" component={Chat} />
                    <Route exact path="/login" render={renderLogin}/>
                </Switch>
            </React.Fragment>
        )
    }
}

let mapStateToProps = state => (console.log(state), {

});

let dispatchToProps = dispatch => ({
    requestLogin: (username, password) => 
        dispatch({type: UserActions.LOGIN_REQUEST, payload: {username, password}})
})

export default withRouter(connect(mapStateToProps, dispatchToProps)(App))