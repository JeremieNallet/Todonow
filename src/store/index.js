//redux
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';

// firebase
import { getFirebase } from 'react-redux-firebase';
import firebase from '../services/config/fbConfig';

// Main reducer
import rootReducer from './reducers/rootReducer';

const composeEnhancers =
    process.env.NODE_ENV === 'development'
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
        : compose;

const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
};

const saveLocalStorage = state => {
    try {
        const stateToDefine = JSON.stringify(state);
        localStorage.setItem('state', stateToDefine);
    } catch (err) {
        console.err(err);
    }
};
const loadLocalStorage = () => {
    try {
        const stateToDefine = localStorage.getItem('state');
        if (stateToDefine === null) return undefined;
        return JSON.parse(stateToDefine);
    } catch (e) {
        console.log(e);
    }
};

const persistedState = loadLocalStorage();
const createReduxStore = () => {
    return createStore(
        rootReducer,
        persistedState,
        composeEnhancers(
            reduxFirestore(firebase),
            applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }))
        )
    );
};

export const store = createReduxStore();
export const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
};
store.subscribe(() => saveLocalStorage(store.getState()));
