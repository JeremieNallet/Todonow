import * as actionType from '../types';

export const timerHasStarted = () => dispatch => dispatch({ type: actionType.TIMER_START });
export const timerHasStopped = () => dispatch => dispatch({ type: actionType.TIMER_STOP });
