

import requireAuth from './RequireAuth';
import React from 'react';


class RegistrationForm extends React.Component {

    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
    }


    render() {
        const requestRegistration = () => {
            this.props.requestRegistration(this.loginRef.current.value, this.passwordRef.current.value);
        }

        const toLogin = () => {
            this.props.history.push("/login")
        }

        return (
            <div className="megaform">
                <div className="megaform__title">
                    Sign up
                </div>
                <div className="megaform__inner">
                    <div className="megaform__row">
                        <input ref={this.loginRef} type="text" placeholder="Username" name="username"/>
                    </div>
                    <div className="megaform__row">
                        <input ref={this.passwordRef} type="password" placeholder="Password" name="password"/>
                    </div>
                    <div className="megaform__row">
                        <input type="button" className="green" onClick={requestRegistration} value="Register" />
                    </div>
                    <div className="megaform__row">
                        <input type="button" onClick={toLogin} value="Sign in" />
                    </div>
                </div>
            </div>
        )
    }
}

export default requireAuth(RegistrationForm, false);