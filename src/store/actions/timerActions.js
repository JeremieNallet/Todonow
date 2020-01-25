import * as str from '../types';

export const toggleTimer = () => dispatch => dispatch({ type: str.TIMER_START });

export const stopTimer = () => dispatch => dispatch({ type: str.TIMER_STOP });
