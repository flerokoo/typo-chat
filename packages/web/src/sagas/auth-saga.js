import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserActions } from '../reducers/auth-reducer'
import Axios from 'axios';

let loginUserService = payload => {
    return Axios.post("/api/users/auth", payload, {
        maxRedirects: 0,
        withCredentials: true
    })
    .then(response => ({ response: response.data }))
    .catch(error => ({ error }))
}

export function* authSaga(action) {
    if (!action || !action.payload) return put({ type: UserActions.LOGIN_FAILURE });

    try {
        const { response, error } = yield call(loginUserService, action.payload); 
        
        if (!error) {
            yield put({ type: UserActions.LOGIN_SUCCESS, payload: response });
        } else {
            yield put({ type: UserActions.LOGIN_FAILURE , payload: { error } })
        }
    } catch(error) {
        yield put({ type: UserActions.LOGIN_FAILURE, payload: { error: error.message } })
    }
}

  
export function* watchLoginRequest() {
    yield takeLatest(UserActions.LOGIN_REQUEST, authSaga)
}