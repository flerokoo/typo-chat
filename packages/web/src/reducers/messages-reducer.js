
export const MessageActions = {
    GET_MESSAGE_REQUEST: "get-message-request",
    GET_MESSAGE_SUCCESS: "get-message-success",
    GET_MESSAGE_FAILURE: "get-message-failure",
    SEND_MESSAGE_REQUEST: "send-message-request",
    SEND_MESSAGE_SUCCESS: "send-message-success",
    SEND_MESSAGE_FAILURE: "send-message-failure"
}

const initial = {
    messages: null,
    error: null,
    updating: false,
    sending: false
};

export default function messageReducer(state = initial, action) {  
    switch (action.type) {
        case MessageActions.GET_MESSAGE_SUCCESS:
            return { 
                ...initial,
                ...(action.payload || {}),
                error: null,
                updating: false 
            }
        case MessageActions.GET_MESSAGE_FAILURE:
            return { 
                ...initial,
                ...(action.payload || {}),
            } 
        case MessageActions.GET_MESSAGE_REQUEST:
            return {
                ...initial,
                messages: state.messages,
                updating: true               
            }
        case MessageActions.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                sending: true
            }
        case MessageActions.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                sending: false
            }
        case MessageActions.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                sending: false,
                ...(action.payload || {})
            }
        default:
            return state;
    }
}
