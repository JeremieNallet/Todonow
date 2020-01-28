import * as str from '../types';

const initialState = { isTimerActive: false };

export default (state = initialState, { type }) => {
    switch (type) {
        case str.TIMER_START:
            return { ...state, isTimerActive: true };
        case str.TIMER_STOP:
            return { ...state, isTimerActive: false };
        default:
            return state;
    }
};
