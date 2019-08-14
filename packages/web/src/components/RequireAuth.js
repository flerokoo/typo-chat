import React from 'react';
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";


export default function requireAuth(Component, requires = true, redirectTo = null) {

    redirectTo = redirectTo || (requires ? "/login" : "/")

    class AuthComponent extends React.Component {
        render() {
            const loggedIn = this.props.userLoggedIn;
            if (requires ? loggedIn : !loggedIn) {
                return (<Component {...this.props}/>)
            } else if(this.props.userLoggingIn) {
                return (<div>Loading</div>)
            } else {
                return (<Redirect to={redirectTo}/>)
            }
        }
    }

    let mapStateToProps = state => ({
        userLoggedIn: state.auth.loggedIn,
        userLoggingIn: state.auth.loggingIn
    })

    return withRouter(connect(mapStateToProps, null)(AuthComponent))
}