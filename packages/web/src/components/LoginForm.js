

import requireAuth from './RequireAuth';
import React from 'react';


class LoginForm extends React.Component {

    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    

    render() {
        const requestLogin = () =>
            this.props.requestLogin(this.loginRef.current.value, this.passwordRef.current.value);

        return (
            <form method="post" action="/login">
                {/* <label>Login</label> */}
                <input ref={this.loginRef} type="text" placeholder="Username" name="username" defaultValue="USR"/>
                {/* <label>Password</label> */}
                <input ref={this.passwordRef} type="password" placeholder="Password" name="password" defaultValue="pass"/>                      
                <input type="button" onClick={requestLogin} value="Go!" />
            </form> 
        )
    }
}

export default requireAuth(LoginForm, false);