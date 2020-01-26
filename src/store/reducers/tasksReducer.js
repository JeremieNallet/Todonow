import * as actionType from '../types';
import * as localData from '../../utils/localDataReducer';

const initialState = {
    error: null,
    loading: false,
    deleteTask: {
        error: null,
        loading: false
    },
    tasks: []
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case actionType.TASK_ADD:
            return { ...state, loading: true };
        case actionType.TASK_ADD_SUCCESS:
            return { ...state, loading: false };
        case actionType.TASK_ADD_FAIL:
            return { ...state, loading: false };
        case actionType.TASK_DELETE_END:
            return { ...state, deleteTask: { ...state.deleteTask, loading: true } };
        case actionType.TASK_DELETE_SUCCESS:
            return { ...state, deleteTask: { ...state.deleteTask, loading: false } };
        case actionType.TASK_DELETE_FAIL:
            return { ...state, deleteTask: { ...state.deleteTask, loading: false } };

        case actionType.TASK_ADD_LOCAL:
            return localData.addTask(state, payload);
        case actionType.TASK_EDIT_LOCAL:
            return localData.editTask(state, payload);
        case actionType.TASK_SAVE_TIME_SPENT_LOCAL:
            return localData.saveTimeSpent(state, payload);
        case actionType.TASK_DELETE_LOCAL:
            return localData.deleteTask(state, payload);
        case actionType.TASK_DELETE_ALL_COMPLETED_LOCAL:
            return localData.deleteAllCompletedTask(state);
        case actionType.TASK_COMPLETE_LOCAL:
            return localData.markTaskComplete(state, payload);
        case actionType.TASK_SELECT_LOCAL:
            return localData.selectTask(state, payload);

        default:
            return state;
    }
};
