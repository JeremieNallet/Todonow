import * as actionType from '../types';

export const toggleTimer = () => dispatch => dispatch({ type: actionType.TIMER_START });
export const stopTimer = () => dispatch => dispatch({ type: actionType.TIMER_STOP });
