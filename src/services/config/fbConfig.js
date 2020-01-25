import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: 'twenty5-47406.firebaseapp.com',
    databaseURL: 'https://twenty5-47406.firebaseio.com',
    projectId: 'twenty5-47406',
    storageBucket: 'twenty5-47406.appspot.com',
    messagingSenderId: '125176436308',
    appId: '1:125176436308:web:5a1ba39283d8c3e4'
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase;
