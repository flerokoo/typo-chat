import { StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../configure-store';
import App from '../containers/App'
import ReactDOM from 'react-dom/server';
import React from 'react';
import { UserActions } from '../reducers/auth-reducer';

const template = (title, redux = {}, content) => {
    return `<!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,700,700i&display=swap" rel="stylesheet">
            <link rel="stylesheet" href="/s/css/main.css"/>
            <title>${title}</title>
            <script>
                window.__REDUX_STATE__ = '${JSON.stringify(redux)}';
            </script>
        </head>

        <body>        
            <div class="app">${content}</div>
            <script type="text/javascript" src="/s/js/bundle.js"></script>
        </body>

        </html>`
}

module.exports = (req, res) => {
    let context = {};
    let store = configureStore();        

    if (req.user) {
        store.dispatch({
            type: UserActions.LOGIN_SUCCESS, payload: {
                ...req.user
            }
        })
    }

    let react = ReactDOM.renderToString((
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    ));

    
    if (context.url) {
        res.writeHead(301, {
            Location: context.url
        });
        res.end();
    } else {
        let storeState = store.getState();
        console.log(req.url)
        console.log("STORESTATE", storeState)
        // let { error, validatedStoreState } = joi.validate(storeState, reduxStateSchema);

        // if (error) {
        //     return next(error);
        // }

        // let water = template({
        //     react,
        //     redux: validatedStoreState,                
        //     title: "Some title"
        // })

        let water = template("Some title", storeState, react )

        res.send(water);
    }
}

