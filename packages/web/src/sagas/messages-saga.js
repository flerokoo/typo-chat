import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import Axios from 'axios';
import { MessageActions } from '../reducers/messages-reducer';

let getMessagesService = roomId => {
    return Axios.get(`/api/messages/${roomId}`, {}, {
        maxRedirects: 0,
        withCredentials: true
    })
    .then(response => response.data)
    .then(data => {
        if(data.error) {
            return Promise.reject(data.error)
        } else {
            return Promise.resolve(data)
        }
    })
}

let sendMessageService = payload => {
    return Axios.post(`/api/messages/`, payload, {
        maxRedirects: 0,
        withCredentials: true
    })
    .then(response => response.data)
    .then(data => {
        if(data.error) {
            return Promise.reject(data.error)
        } else {
            return Promise.resolve(data)
        }
    })
}


export function* getMessagesSaga(action) {
    if (!action || !action.payload || !action.payload.roomId) return put({ 
        type: MessageActions.GET_MESSAGE_FAILURE, 
        payload: { error: "Wrong data supplied" } 
    });
    
    try {
        const response = yield call(getMessagesService, action.payload.roomId); 
        console.log(response)
        yield put({ type: MessageActions.GET_MESSAGE_SUCCESS, payload: {messages: response} });
    } catch(error) {
        error = error && error.message ? error.message : error;
        yield put({ type: MessageActions.GET_MESSAGE_FAILURE, payload: { error } })
    }
}

export function* sendMessageSaga(action) {
    if (!action || !action.payload || !action.payload.roomId || !action.payload.userId 
        || !action.payload.text) return put({ 
        type: MessageActions.SEND_MESSAGE_FAILURE, 
        payload: { error: "Wrong data supplied" } 
    });

    try {
        const response = yield call(sendMessageService, action.payload); 
        yield put({ type: MessageActions.SEND_MESSAGE_SUCCESS });
    } catch(error) {
        error = error && error.message ? error.message : error;
        yield put({ type: MessageActions.SEND_MESSAGE_FAILURE, payload: { error } })
    }
}

  
export function* watchGetMessagesRequest() {
    yield takeLatest(MessageActions.GET_MESSAGE_REQUEST, getMessagesSaga)
}

export function* watchSendMessageRequest() {
    yield takeEvery(MessageActions.SEND_MESSAGE_REQUEST, sendMessageSaga)
}