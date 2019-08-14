import { all } from 'redux-saga/effects';
import { authSaga, watchLoginRequest } from './auth-saga';

export default function* rootSaga() {
    yield all([
        authSaga(),
        watchLoginRequest()
    ])
}