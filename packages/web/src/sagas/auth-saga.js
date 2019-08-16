import saga from 'redux-saga';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';
import { UserActions } from '../reducers/auth-reducer'
import Axios from 'axios';
import { createApiService, createApiCallSaga } from './saga-utils';
import joi from 'joi-browser';

// let loginUserService = payload => {
//     return Axios.post("/api/users/auth", payload, {
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

const loginUserService = createApiService("/api/users/auth", "post")

// export function* authSaga(action) {
//     if (!action || !action.payload) return put({ 
//         type: UserActions.LOGIN_FAILURE, 
//         payload: { error: "Wrong data supplied" } 
//     });
    
//     try {
//         const response = yield call(loginUserService, action.payload); 
//         yield put({ type: UserActions.LOGIN_SUCCESS, payload: response });
//     } catch(error) {
//         error = error && error.message ? error.message : error;
//         yield put({ type: UserActions.LOGIN_FAILURE, payload: { error } })
//     }
// }

const authScheme = joi.object().keys({
    username: joi.string().min(3),
    password: joi.string().min(3)
})

export const authSaga = createApiCallSaga(
    UserActions.LOGIN_SUCCESS,
    UserActions.LOGIN_FAILURE,
    loginUserService,
    payload => {
        let { error, value } = authScheme.validate(payload);
        if (error) {
            return { error };
        }
        return value;
    },
    response => response
)


  
export function* watchLoginRequest() {
    yield takeLatest(UserActions.LOGIN_REQUEST, authSaga)
}