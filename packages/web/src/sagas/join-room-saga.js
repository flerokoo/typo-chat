import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { RoomActions } from '../reducers/room-reducer';
import { createApiService, createApiCallSaga } from './saga-utils';

// let verifyRoomExistanceService = payload => {

//     const opts = {
//         maxRedirects: 0,
//         withCredentials: true
//     };

//     return axios.post("/api/rooms/",  payload, opts)
//         .then(response => response.data)
//         .then(data => {
//             if(data.error) {
//                 return Promise.reject(data.error)
//             } else {
//                 return Promise.resolve(data.roomId)
//             }
//         })
// }

const verifyRoomExistanceService = createApiService("/api/rooms", 'post');

// export function* joinRoomSaga(action) {
//     const roomId = action && action.payload ? action.payload.roomId : "";

//     try {
//         const response = yield call(verifyRoomExistanceService, { roomId }); 
//         yield put({ type: RoomActions.JOIN_SUCCESS, payload: { id: response.roomId } });
//     } catch(error) {
//         error = error && error.message ? error.message : error;
//         yield put({ type: RoomActions.JOIN_FAILURE, payload: { error } })
//     }    
// }

export const joinRoomSaga = createApiCallSaga(
    RoomActions.JOIN_SUCCESS,
    RoomActions.JOIN_FAILURE,
    verifyRoomExistanceService,
    payload => payload,
    response => ({ id: response.roomId })
)

  
export function* watchJoinRoomRequest() {
    yield takeLatest(RoomActions.JOIN_REQUEST, joinRoomSaga)
}

