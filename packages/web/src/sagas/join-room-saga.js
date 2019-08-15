import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { RoomActions } from '../reducers/room-reducer';

let verifyRoomExistanceService = roomId => {

    const opts = {
        maxRedirects: 0,
        withCredentials: true
    };

    return axios.post("/api/rooms/", { roomId }, opts)
        .then(response => response.data)
        .then(data => {
            if(data.error) {
                return Promise.reject(data.error)
            } else {
                return Promise.resolve(data.roomId)
            }
        })
}

export function* joinRoomSaga(action) {
    const roomId = action && action.payload ? action.payload.roomId : "";

    try {
        const newRoomId = yield call(verifyRoomExistanceService, roomId); 
        yield put({ type: RoomActions.JOIN_SUCCESS, payload: { id: newRoomId } });
    } catch(error) {
        error = error && error.message ? error.message : error;
        yield put({ type: RoomActions.JOIN_FAILURE, payload: { error } })
    }

    
}

  
export function* watchJoinRoomRequest() {
    yield takeLatest(RoomActions.JOIN_REQUEST, joinRoomSaga)
}

