import * as actionType from '../types';
import uuid from 'uuid';

export const adOneTask_nodb = data => dispatch => {
    dispatch({
        type: actionType.TASK_ADD_NODB,
        payload: {
            id: uuid.v4(),
            createAt: new Date().toISOString(),
            title: data.title,
            description: data.description,
            completed: false,
            selected: false,
            time: 0
        }
    });
};

export const saveTimeSpent_nodb = id => dispatch => {
    // dispatch({
    //     type: actionType.TASK_SAVE_TIME_SPENT_NODB,
    //     payload: { id }
    // });
};

export const editTask_nodb = (id, data) => dispatch => {
    dispatch({
        type: actionType.TASK_EDIT_NODB,
        payload: {
            id,
            title: data.title,
            description: data.description
        }
    });
};

export const deleteTask_nodb = id => dispatch => {
    dispatch({
        type: actionType.TASK_DELETE_NODB,
        payload: { id }
    });
};

export const markTaskComplete_nodb = id => dispatch => {
    dispatch({
        type: actionType.TASK_COMPLETE_NODB,
        payload: { id }
    });
};

export const selectTask_nodb = id => dispatch => {
    dispatch({
        type: actionType.TASK_SELECT_NODB,
        payload: { id }
    });
};

export const deleteAllCompleted_nodb = id => dispatch => {
    dispatch({
        type: actionType.TASK_DELETE_ALL_COMPLETED_NODB,
        payload: { id }
    });
};

export const addOneTask = data => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actionType.TASK_ADD });
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();
        const newTasks = {
            id: uuid.v4(),
            createAt: new Date().toISOString(),
            title: data.title,
            description: data.description,
            completed: false,
            selected: false,
            time: 0
        };
        if (!res.data()) {
            firestore
                .collection('tasks')
                .doc(userId)
                .set({ task: [newTasks] });
        } else {
            firestore
                .collection('tasks')
                .doc(userId)
                .update({ task: [...res.data().task, newTasks] });
        }

        dispatch({ type: actionType.TASK_ADD_SUCCESS });
        return true;
    } catch (err) {
        console.error(err);
        dispatch({ type: actionType.TASK_ADD_FAIL });
    }
};

export const deleteTask = id => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actionType.TASK_DELETE_END });
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();
        const previousTasks = res.data().task;
        const newTasks = previousTasks.filter(task => task.id !== id);

        await firestore
            .collection('tasks')
            .doc(userId)
            .update({ task: newTasks });

        dispatch({ type: actionType.TASK_DELETE_SUCCESS });
    } catch (err) {
        console.error(err);
        dispatch({ type: actionType.TASK_DELETE_FAIL });
    }
};

export const deleteAllCompletedTasks = () => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actionType.TASK_DELETE_END });
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();
        const previousTasks = res.data().task;
        const newTask = previousTasks.filter(task => !task.completed);

        await firestore
            .collection('tasks')
            .doc(userId)
            .update({ task: newTask });

        dispatch({ type: actionType.TASK_DELETE_SUCCESS });
    } catch (err) {
        console.error(err);
        dispatch({ type: actionType.TASK_DELETE_FAIL });
    }
};

export const editTask = (id, data) => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    dispatch({ type: actionType.TASK_ADD });
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();

        const task = res.data().task;
        const index = task.findIndex(task => task.id === id);

        task[index].title = data.title;
        task[index].description = data.description;

        await firestore
            .collection('tasks')
            .doc(userId)
            .update({ task });

        dispatch({ type: actionType.TASK_ADD_SUCCESS });
        return true;
    } catch (err) {
        console.error(err);
        dispatch({ type: actionType.TASK_ADD_FAIL });
    }
};

export const selectTask = id => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();

        const task = res.data().task;

        task.forEach(task => {
            if (task.id === id) task.selected = !task.selected;
            else task.selected = false;
        });

        await firestore
            .collection('tasks')
            .doc(userId)
            .update({
                task
            });
    } catch (err) {}
};

export const markTaskComplete = id => async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const userId = getState().firebase.auth.uid;
    try {
        const res = await firestore
            .collection('tasks')
            .doc(userId)
            .get();

        const task = res.data().task;

        task.forEach(task => {
            if (task.id === id) {
                task.completed = true;
                task.selected = false;
            }
        });

        await firestore
            .collection('tasks')
            .doc(userId)
            .update({ task });
    } catch (err) {}
};
