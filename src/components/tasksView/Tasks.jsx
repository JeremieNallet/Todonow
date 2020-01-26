import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Components
import TaskItem from './TaskItem';
import TaskAddForm from './TaskAddForm';
import TaskSkeleton from './TaskSkeleton';
import TaskHeader from './TaskHeader';

// Store
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { toggleModal } from '../../store/actions/UIActions';
import { adOneTask_local } from '../../store/actions/tasksActions';

const Tasks = ({ localData, dataBase, userId, completedList, toggleModal, guestUser }) => {
    const [isAdding, setIsAdding] = useState(false);
    const [filterTasks, setFilterTasks] = useState('');
    const dataBaseEmpty = !dataBase || !dataBase[userId] || dataBase[userId].task.length === 0;
    let TaskItem_completed = null;
    let TaskItem_unCompleted = null;

    const createTaskItemFrom = data => {
        const filteredList = data.filter(el => el.title.trim().includes(filterTasks));
        const item = (task, list) => <TaskItem completedList={list} task={task} key={task.id} />;
        TaskItem_completed = <>{filteredList.map(task => item(task, task.completed))}</>;
        TaskItem_unCompleted = <>{filteredList.map(task => item(task, !task.completed))}</>;
    };

    const deleteAllCompletedTasks = () => {
        const completedTasks_local = localData.filter(task => task.completed);
        const completedTasks_dataBase = dataBase[userId].task.filter(task => task.completed);
        if (guestUser) completedTasks_local.length > 0 && toggleModal();
        else {
            if (dataBaseEmpty) return;
            else completedTasks_dataBase.length > 0 && toggleModal();
        }
    };

    const headerBtnActions = () => {
        !completedList ? setIsAdding(!isAdding) : deleteAllCompletedTasks();
    };

    if (guestUser) {
        if (localData.length === 0) TaskItem_completed = TaskItem_unCompleted = <TaskSkeleton />;
        else createTaskItemFrom(localData);
    } else {
        if (dataBaseEmpty) TaskItem_completed = TaskItem_unCompleted = <TaskSkeleton />;
        else createTaskItemFrom(dataBase[userId].task);
    }

    return (
        <div className="tasks">
            <div className="tasks__head">
                <TaskHeader
                    filter={[setFilterTasks, filterTasks]}
                    headerBtnActions={headerBtnActions}
                    completedList={completedList}
                    isAdding={isAdding}
                />
            </div>
            <div className="tasks__list">
                {completedList ? TaskItem_completed : TaskItem_unCompleted}
                {isAdding && <TaskAddForm setIsAdding={setIsAdding} />}
            </div>
        </div>
    );
};

Tasks.propTypes = {
    tasks: PropTypes.object,
    userId: PropTypes.string,
    completedList: PropTypes.bool,
    toggleModal: PropTypes.func,
    guestUser: PropTypes.bool
};
const mapStateToProps = ({ firebase, firestore, task, auth }) => ({
    userId: firebase.auth.uid,
    dataBase: firestore.data.tasks,
    localData: task.tasks,
    guestUser: auth.guestUser
});
const mapDispatchToProps = {
    toggleModal,
    adOneTask_local
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(Tasks);
