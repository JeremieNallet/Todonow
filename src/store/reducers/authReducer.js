import * as actionType from '../types';

//initial state
const initialState = {
    error: null,
    loading: false,
    guestUser: false,
    recoverPassword: {
        error: null,
        loading: false,
        emailSent: false
    }
};

const recoverPw_start = state => {
    return {
        ...state,
        recoverPassword: {
            ...state.recoverPassword,
            emailSent: false,
            loading: true
        }
    };
};
const recoverPw_success = state => {
    return {
        ...state,
        recoverPassword: {
            ...state.recoverPassword,
            emailSent: true,
            loading: false,
            error: false
        }
    };
};
const recoverPw_fail = (state, payload) => {
    return {
        ...state,
        recoverPassword: {
            ...state.recoverPassword,
            emailSent: false,
            loading: false,
            error: payload
        }
    };
};

const recoverPw_end = state => {
    return {
        ...state,
        recoverPassword: {
            ...state.recoverPassword,
            emailSent: false,
            loading: false
        }
    };
};

const cleanUp = state => {
    return {
        ...state,
        error: null,
        loading: false,
        recoverPassword: {
            ...state.recoverPassword,
            loading: false,
            error: null
        }
    };
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.AUTH_CLEAN_UP:
            return cleanUp(state);
        case actionType.AUTH_START:
            return { ...state, loading: true };
        case actionType.AUTH_END:
            return { ...state, loading: false };
        case actionType.AUTH_FAIL:
            return { ...state, error: payload };
        case actionType.AUTH_SUCCESS:
            return { ...state, error: null };
        case actionType.AUTH_CONNECT_GUEST:
            return { ...state, guestUser: true };
        case actionType.AUTH_DISCONECT_GUEST:
            return { ...state, guestUser: false };

        case actionType.AUTH_RECOVER_PW_START:
            return recoverPw_start(state);
        case actionType.AUTH_RECOVER_PW_SUCCESS:
            return recoverPw_success(state);
        case actionType.AUTH_RECOVER_PW_FAIL:
            return recoverPw_fail(state, payload);
        case actionType.AUTH_RECOVER_PW_END:
            return recoverPw_end(state);
        default:
            return state;
    }
};
