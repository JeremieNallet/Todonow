import * as actionType from '../types';

const initialState = {
    error: null,
    loading: false,
    deleteTask: {
        error: null,
        loading: false
    },
    tasks: []
};

const NODB_editTask = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el => {
            if (el.id === payload.id) {
                el.title = payload.title;
                el.description = payload.description;
            } else return { ...el };
            return el;
        })
    };
};
const NODB_deleteAllCompletedTask = state => {
    return {
        ...state,
        tasks: state.tasks.filter(el => !el.completed)
    };
};
const NODB_deleteTask = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.filter(el => el.id !== payload.id)
    };
};
const NODB_markTaskComplete = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el =>
            el.id === payload.id ? { ...el, completed: true, selected: false } : { ...el }
        )
    };
};
const NODB_selectTask = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el =>
            el.id === payload.id ? { ...el, selected: !el.selected } : { ...el, selected: false }
        )
    };
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
        case actionType.TASK_ADD_NODB:
            return { ...state, tasks: [...state.tasks, payload] };

        case actionType.TASK_EDIT_NODB:
            return NODB_editTask(state, payload);
        case actionType.TASK_DELETE_NODB:
            return NODB_deleteTask(state, payload);
        case actionType.TASK_DELETE_ALL_COMPLETED_NODB:
            return NODB_deleteAllCompletedTask(state);
        case actionType.TASK_COMPLETE_NODB:
            return NODB_markTaskComplete(state, payload);
        case actionType.TASK_SELECT_NODB:
            return NODB_selectTask(state, payload);

        default:
            return state;
    }
};
