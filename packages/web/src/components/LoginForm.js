

import requireAuth from './RequireAuth';
import React from 'react';


class LoginForm extends React.Component {

    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }

    

    render() {
        const requestLogin = () => {
            this.props.requestLogin(this.loginRef.current.value, this.passwordRef.current.value);

        }

        return (
            <div className="megaform">
                <div className="megaform__title">
                    Sign in
                </div>
                <div className="megaform__inner">
                    <div className="megaform__row">
                        <input ref={this.loginRef} type="text" placeholder="Username" name="username" defaultValue="USR"/>
                    </div>
                    <div className="megaform__row">
                        <input ref={this.passwordRef} type="password" placeholder="Password" name="password" defaultValue="pass"/>
                    </div>
                    <div className="megaform__row">
                        <input type="button" onClick={requestLogin} value="Go!" />
                    </div>
                </div>
            </div>
        )
    }
}

export default requireAuth(LoginForm, false);