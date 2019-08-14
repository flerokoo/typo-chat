
export const UserActions = {
    LOGIN_REQUEST: "login-request",
    LOGIN_SUCCESS: "login-success",
    LOGIN_FAILURE: "login-failure"
}

const initial = {
    username: null,
    token: false,
    loggingIn: false,
    loggedIn: false
}

export default function sidebarReducer(state = initial, action) {  
    switch (action.type) {
        case UserActions.LOGIN_SUCCESS:
            return {
                ...state,
                loggingIn: false,
                loggedIn: true,
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
                loggingIn: true,
                loggedIn: false
            }
        default:
            return state;
    }
}
