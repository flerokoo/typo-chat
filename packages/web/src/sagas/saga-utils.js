
import Axios from 'axios';
import { put, call, watch, takeEvery, takeLatest } from 'redux-saga/effects';

const defaultOpts = {
    maxRedirects: 0,
    withCredentials: true
}

export const createApiService = (url, method, opts = {}) => payload => {

    const callFn = Axios[method.toLowerCase()].bind(Axios);

    // console.log(payload, typeof url === 'function' ? url(payload) : url)

    return callFn(typeof url === 'function' ? url(payload) : url, payload, {
        ...defaultOpts,
        ...opts
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

export const createApiCallSaga = (successAction, failureAction, serviceFn, extractData, formatResponse) => 
    function* joinRoomSaga(action) {

        const data = extractData(action.payload || {});
        
        if (data.error) {
            return yield put({ type: failureAction, payload: { error : data.error } });
        }

        try {
            const response = yield call(serviceFn, data); 
            const payload = formatResponse(response);
            yield put({ type: successAction, payload });
        } catch(error) {
            error = error && error.message ? error.message : error;
            yield put({ type: failureAction, payload: { error } })
        }    
    }