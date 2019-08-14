import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth-reducer';
import rootSaga from './sagas/';


export default function configureStore(preloadedState = {}) {
    
    let combined = combineReducers({
        auth: authReducer
    })

    let sagaMiddleware = createSagaMiddleware();
    let enhancers = [ sagaMiddleware ]
    
    let store = createStore(combined, preloadedState, applyMiddleware(...enhancers));

    sagaMiddleware.run(rootSaga)

    return store;
}