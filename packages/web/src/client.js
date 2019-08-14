import ReactDOM from "react-dom";
import React from 'react';
import App from './containers/App';
import { BrowserRouter } from 'react-router-dom';
import configureStore from "./configure-store";
import { Provider } from 'react-redux';
import "regenerator-runtime/runtime";
import "core-js/stable";
import './style/index.scss'

let preloadedState = {};

try {
    preloadedState = JSON.parse(window.__REDUX_STATE__)
} catch (e) {
    // TODO add logging
}

const root = document.getElementsByClassName("app")[0]
let store = configureStore(preloadedState);
let composition = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.hydrate(composition, root)