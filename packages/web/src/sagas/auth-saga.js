import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserActions } from '../reducers/auth-reducer'
import Axios from 'axios';

let loginUserService = payload => {
    return Axios.post("/api/users/auth", payload, {
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

export function* authSaga(action) {
    if (!action || !action.payload) return put({ type: UserActions.LOGIN_FAILURE });

    try {
        const response = yield call(loginUserService, action.payload); 
        yield put({ type: UserActions.LOGIN_SUCCESS, payload: response });
    } catch(error) {
        error = error && error.message ? error.message : error;
        yield put({ type: UserActions.LOGIN_FAILURE, payload: { error } })
    }
}

  
export function* watchLoginRequest() {
    yield takeLatest(UserActions.LOGIN_REQUEST, authSaga)
}