import { createStore, combineReducers, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/auth-reducer';
import roomReducer from './reducers/room-reducer';
import rootSaga from './sagas/';
import messageReducer from './reducers/messages-reducer';
import chatMenuReducer from './reducers/chat-menu-reducer';


export default function configureStore(preloadedState = {}) {
    
    let combined = combineReducers({
        auth: authReducer,
        room: roomReducer,
        chat: messageReducer,
        chatMenu: chatMenuReducer
    })

    let sagaMiddleware = createSagaMiddleware();
    let enhancers = [ sagaMiddleware ]
    
    let store = createStore(combined, preloadedState, applyMiddleware(...enhancers));

    sagaMiddleware.run(rootSaga)

    return store;
}