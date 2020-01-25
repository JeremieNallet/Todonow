import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

//reducers
import authReducer from './authReducer';
import taskReducer from './tasksReducer';
import uiReducer from './uiReducer';
import timerReducer from './timerReducer';

export default combineReducers({
    auth: authReducer,
    task: taskReducer,
    ui: uiReducer,
    timer: timerReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});
