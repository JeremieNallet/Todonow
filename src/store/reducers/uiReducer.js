import * as actionType from '../types';

const initialState = {
    isNavOpen: false,
    isTaskFormOpen: false,
    isModalOpen: false,
    hasAccount: false
};

export default (state = initialState, { type }) => {
    switch (type) {
        case actionType.UI_TOGGLE_NAV:
            return { ...state, isNavOpen: !state.isNavOpen };
        case actionType.UI_TOGGLE_ADD_TASK:
            return { ...state, isTaskFormOpen: !state.isTaskFormOpen };
        case actionType.UI_TOGGLE_MODAL:
            return { ...state, isModalOpen: !state.isModalOpen };
        case actionType.UI_CLOSE_NAV:
            return { ...state, isNavOpen: false };
        case actionType.UI_OPEN_LOGIN:
            return { ...state, hasAccount: true };
        case actionType.UI_OPEN_CREATE:
            return { ...state, hasAccount: false };
        default:
            return state;
    }
};
