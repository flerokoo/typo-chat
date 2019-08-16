import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest, actionChannel } from 'redux-saga/effects';
import Axios from 'axios';
import { MessageActions } from '../reducers/messages-reducer';
import { createApiService, createApiCallSaga } from './saga-utils';
import joi from 'joi-browser';

// let getMessagesService = roomId => {
//     return Axios.get(`/api/messages/${roomId}`, {}, {
//         maxRedirects: 0,
//         withCredentials: true
//     })
//     .then(response => response.data)
//     .then(data => {
//         if(data.error) {
//             return Promise.reject(data.error)
//         } else {
//             return Promise.resolve(data)
//         }
//     })
// }



// let sendMessageService = payload => {
//     return Axios.post(`/api/messages/`, payload, {
//         maxRedirects: 0,
//         withCredentials: true
//     })
//     .then(response => response.data)
//     .then(data => {
//         if(data.error) {
//             return Promise.reject(data.error)
//         } else {
//             return Promise.resolve(data)
//         }
//     })
// }

const getMessagesService = createApiService( ({roomId}) => `/api/messages/${roomId}`, 'get')
const sendMessageService = createApiService( `/api/messages`, 'post')


// export function* getMessagesSaga(action) {
//     if (!action || !action.payload || !action.payload.roomId) return put({ 
//         type: MessageActions.GET_MESSAGE_FAILURE, 
//         payload: { error: "Wrong data supplied" } 
//     });
    
//     try {
//         const response = yield call(getMessagesService, { roomId: action.payload.roomId }); 
//         console.log(response)
//         yield put({ type: MessageActions.GET_MESSAGE_SUCCESS, payload: {messages: response} });
//     } catch(error) {
//         error = error && error.message ? error.message : error;
//         yield put({ type: MessageActions.GET_MESSAGE_FAILURE, payload: { error } })
//     }
// }

const getMessageScheme = joi.object().keys({
    roomId: joi.string().length(24)
})

export const getMessagesSaga = createApiCallSaga(
    MessageActions.GET_MESSAGE_SUCCESS, 
    MessageActions.GET_MESSAGE_FAILURE,
    getMessagesService,
    payload => {
        let { error, value } = getMessageScheme.validate(payload);
        if (error) {
            return { error };
        }
        return value;
    },
    response => ({ messages: response.reverse() })
);

// export function* sendMessageSaga(action) {
//     if (!action || !action.payload || !action.payload.roomId || !action.payload.userId 
//         || !action.payload.text) return put({ 
//         type: MessageActions.SEND_MESSAGE_FAILURE, 
//         payload: { error: "Wrong data supplied" } 
//     });

//     try {
//         const response = yield call(sendMessageService, action.payload); 
//         yield put({ type: MessageActions.SEND_MESSAGE_SUCCESS });
//     } catch(error) {
//         error = error && error.message ? error.message : error;
//         yield put({ type: MessageActions.SEND_MESSAGE_FAILURE, payload: { error } })
//     }
// }

const sendMessageScheme = joi.object().keys({
    userId: joi.string().length(24),
    roomId: joi.string().length(24),
    text: joi.string().min(1),
})

export const sendMessageSaga = createApiCallSaga(
    MessageActions.SEND_MESSAGE_SUCCESS,
    MessageActions.SEND_MESSAGE_FAILURE,
    sendMessageService,
    payload => {
        let { error, value } = sendMessageScheme.validate(payload);
        if (error) {
            return { error };
        }
        return value;
    },
    response => console.log(response)
)

  
export function* watchGetMessagesRequest() {
    yield takeLatest(MessageActions.GET_MESSAGE_REQUEST, getMessagesSaga)
}

export function* watchSendMessageRequest() {
    yield takeEvery(MessageActions.SEND_MESSAGE_REQUEST, sendMessageSaga)
}