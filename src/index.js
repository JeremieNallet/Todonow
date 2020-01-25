import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './assets/scss/main.scss';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
//Router.
import { BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import { store, rrfProps } from './store/index';

ReactDOM.render(
    <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
            <Router>
                <App />
            </Router>
        </ReactReduxFirebaseProvider>
    </Provider>,
    document.getElementById('root')
);
