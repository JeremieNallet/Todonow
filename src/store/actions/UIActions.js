import * as actionType from '../types';

export const toggleNav = () => dispatch => dispatch({ type: actionType.UI_TOGGLE_NAV });
export const closeNav = () => dispatch => dispatch({ type: actionType.UI_CLOSE_NAV });
export const toggleAddTask = () => dispatch => dispatch({ type: actionType.UI_TOGGLE_ADD_TASK });
export const toggleModal = () => dispatch => dispatch({ type: actionType.UI_TOGGLE_MODAL });
export const openLogin = () => dispatch => dispatch({ type: actionType.UI_OPEN_LOGIN });
export const openSignup = () => dispatch => dispatch({ type: actionType.UI_OPEN_CREATE });
