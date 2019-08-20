

import requireAuth from './RequireAuth';
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class LoginForm extends React.Component {

    constructor() {
        super();
        this.loginRef = React.createRef();
        this.passwordRef = React.createRef();
       
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props && prevProps) Object.entries(this.props).forEach(([key, val]) =>
          prevProps[key] !== val && console.log(`Prop '${key}' changed ${JSON.stringify(prevProps[key])} -> ${JSON.stringify(this.props[key])}`)
        );
        if(this.state && prevState) Object.entries(this.state).forEach(([key, val]) =>
          prevState[key] !== val && console.log(`State '${key}' changed`)
        );
      }
    

    render() {
        const requestLogin = () => {
            this.props.requestLogin(this.loginRef.current.value, this.passwordRef.current.value);

        }

        const toRegistration = () => {
            this.props.history.push("/register")
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
                        <input type="button" className="green" onClick={requestLogin} value="Enter!" />
                    </div>
                    <div className="megaform__row">
                        <input type="button" onClick={toRegistration} value="Sign up" />
                    </div>
                </div>
            </div>
        )
    }
}

export default requireAuth(LoginForm, false);