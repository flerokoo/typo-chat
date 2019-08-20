
export const ChatMenuActions = {
    TOGGLE: "chat-menu-toggle"
}

const initial = {
    open: false
};

export default function chatMenuReducer(state = initial, action) { 
     
    switch (action.type) {
        case ChatMenuActions.TOGGLE:
            return { open : !state.open };
        default:
            return state;
    }
}
