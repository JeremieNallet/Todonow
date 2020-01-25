import * as actionType from '../types';

export const logGuestUser = () => dispatch => {
    dispatch({ type: actionType.AUTH_CONNECT_GUEST });
};
export const disconectGuestUser = () => dispatch => {
    dispatch({ type: actionType.AUTH_DISCONECT_GUEST });
};

export const signupUser = data => async (dispatch, getState, { getFirebase, getFirestore }) => {
    dispatch({ type: actionType.AUTH_START });
    const firebase = getFirebase();
    const firestore = getFirestore();

    try {
        const result = await firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password);
        const newUser = firebase.auth().currentUser;
        await newUser.sendEmailVerification();
        await firestore
            .collection('users')
            .doc(result.user.uid)
            .set({ email: data.email });
        dispatch({ type: actionType.AUTH_SUCCESS });
    } catch (err) {
        if (err.code === 'auth/email-already-in-use') {
            const message = 'Email is already in use.';
            dispatch({ type: actionType.AUTH_FAIL, payload: message });
        }
    }
    dispatch({ type: actionType.AUTH_END });
};

//login a user
export const signinUser = data => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: actionType.AUTH_START });
    try {
        await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
        dispatch({ type: actionType.AUTH_SUCCESS });
    } catch (err) {
        if (err.code === 'auth/invalid-email' || 'auth/wrong-password') {
            const message = 'Invalid password or email.';
            dispatch({ type: actionType.AUTH_FAIL, payload: message });
        }
    }
    dispatch({ type: actionType.AUTH_END });
};

//recover user password
export const recoverPassword = data => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch({ type: actionType.AUTH_RECOVER_PW_START });
    try {
        await firebase.auth().sendPasswordResetEmail(data.email);
        dispatch({ type: actionType.AUTH_RECOVER_PW_SUCCESS });
    } catch (err) {
        dispatch({ type: actionType.AUTH_RECOVER_PW_FAIL, payload: err.code });
    }
};

export const closePasswordModal = () => dispatch => {
    dispatch({ type: actionType.AUTH_RECOVER_PW_END });
};

export const signoutUser = () => async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
        await firebase.auth().signOut();
    } catch (err) {
        console.error(err);
    }
};

export const cleanUp = () => ({ type: actionType.AUTH_CLEAN_UP });
