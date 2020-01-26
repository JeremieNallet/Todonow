export const editTask = (state, payload) => {
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
export const deleteAllCompletedTask = state => {
    return {
        ...state,
        tasks: state.tasks.filter(el => !el.completed)
    };
};
export const deleteTask = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.filter(el => el.id !== payload.id)
    };
};
export const markTaskComplete = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el =>
            el.id === payload.id ? { ...el, completed: true, selected: false } : { ...el }
        )
    };
};
export const selectTask = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el =>
            el.id === payload.id ? { ...el, selected: !el.selected } : { ...el, selected: false }
        )
    };
};
export const addTask = (state, payload) => {
    return { ...state, tasks: [...state.tasks, payload] };
};

export const saveTimeSpent = (state, payload) => {
    return {
        ...state,
        tasks: state.tasks.map(el => {
            if (el.id === payload.id) el.timeSpent++;
            else return { ...el };
            return el;
        })
    };
};
