
export const UserActions = {
    LOGIN_REQUEST: "login-request",
    LOGIN_SUCCESS: "login-success",
    LOGIN_FAILURE: "login-failure",
    SIGNUP_REQUEST: "signup-request",
    SIGNUP_SUCCESS: "signup-success",
    SIGNUP_FAILURE: "signup-failure"
}

const initial = {
    username: null,
    token: false,
    loggingIn: false,
    loggedIn: false,
    error: null
}

export default function sidebarReducer(state = initial, action) {  
    switch (action.type) {
        case UserActions.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
                error: null,
                ...action.payload
            };
        case UserActions.LOGIN_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                ...action.payload
            } 
        case UserActions.LOGIN_REQUEST:
            return {
                ...state,
                error: null,
                loggingIn: true,
                loggedIn: false
            }
        case UserActions.SIGNUP_REQUEST:
            return {
                ...state,
                error: null,
                loggingIn: true,
                loggedIn: false
            }
        case UserActions.SIGNUP_FAILURE:
            return {
                ...state,
                loggingIn: false,
                loggedIn: false,
                ...action.payload
            } 
        case UserActions.SIGNUP_SUCCESS:
            console.log(action.payload)
            return {
                ...state,
                loggedIn: true,
                loggingIn: false,
                ...action.payload
            }
        default:
            return state;
    }
}
