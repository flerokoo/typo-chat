
export const RoomActions = {
    JOIN_REQUEST: "room-join-request",
    JOIN_SUCCESS: "room-join-success",
    JOIN_FAILURE: "room-join-failure",
    EXIT: "room-exit"
}

const initial = {
    id: null,
    error: null,
    joining: false,
    joined: false
};

export default function sidebarReducer(state = initial, action) {  
    switch (action.type) {
        case RoomActions.JOIN_SUCCESS:
            return { 
                error: null,
                joining: false,
                joined: true,
                ...action.payload 
            }
        case RoomActions.JOIN_FAILURE:
            return { 
                ...initial,
                ...(action.payload || {})
            } 
        case RoomActions.JOIN_REQUEST:
            return {
                ...initial,
                joining: true               
            }
        case RoomActions.EXIT:
            return initial;
        default:
            return state;
    }
}
