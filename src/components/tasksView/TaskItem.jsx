import React, { useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { useSpring, animated as a } from 'react-spring';

// Components
import ConfirmModal from '../layout/ConfirmModal';
import TaskEditForm from './TaskEditForm';
import TaskMenuBtn from './TaskMenuBtn';
import TaskContent from './TaskContent';

// Store
import { connect } from 'react-redux';
import {
    selectTask,
    deleteTask,
    markTaskComplete,
    deleteTask_local,
    markTaskComplete_local,
    selectTask_local
} from '../../store/actions/tasksActions';

const TaskItem = ({
    task,
    selectTask,
    completedList,
    deleteTask,
    markTaskComplete,
    deleteTask_local,
    markTaskComplete_local,
    guestUser,
    selectTask_local
}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    const props = useSpring({
        transform: task.selected ? 'scale(1.03)' : 'scale(1)',
        background: task.selected ? 'var(--primary-color)' : 'var(--color-white)',
        color:
            task.selected && !isDeleting && !isEditing && !isCompleted
                ? 'var(--color-white)'
                : 'var(--color-black)'
    });

    const _deleteTask = id => (guestUser ? deleteTask_local(id) : deleteTask(id));
    const _markComplete = id => (guestUser ? markTaskComplete_local(id) : markTaskComplete(id));
    const _selectTask = id => (guestUser ? selectTask_local(id) : selectTask(id));

    return (
        <>
            {completedList && (
                <a.div style={props} className="task-item">
                    <div
                        style={{ display: isEditing ? 'none' : 'flex' }}
                        className="task-item__top"
                    >
                        <TaskContent task={task} onClick={() => _selectTask(task.id)} />
                        <TaskMenuBtn
                            isTaskCompleted={task.completed}
                            isTaskSelected={task.selected}
                            handlers={[setIsDeleting, setIsCompleted, setIsEditing]}
                        />
                    </div>
                    <div
                        style={{ display: isEditing ? 'none' : 'flex' }}
                        className="task-item__bottom "
                    >
                        {!task.completed && (
                            <small className="task-item__date">
                                Added the {dayjs(task.createAt).format('DD MMM')}
                            </small>
                        )}
                    </div>
                    {isDeleting && (
                        <ConfirmModal
                            title={`Delete ${task.title} ?`}
                            btnTitle="Delete"
                            closeModal={() => setIsDeleting(false)}
                            triggerAction={() => _deleteTask(task.id)}
                        />
                    )}
                    {isCompleted && (
                        <ConfirmModal
                            title={`Have you completed ${task.title} ?`}
                            task={task}
                            btnTitle="Yes"
                            closeModal={() => setIsCompleted(false)}
                            triggerAction={() => _markComplete(task.id)}
                        />
                    )}
                    {isEditing && (
                        <TaskEditForm task={task} closeModal={() => setIsEditing(false)} />
                    )}
                </a.div>
            )}
        </>
    );
};

TaskItem.propTypes = {
    task: PropTypes.object,
    completedList: PropTypes.bool,
    deleteTask: PropTypes.func,
    selectTask: PropTypes.func,
    selectTask_local: PropTypes.func,
    deleteTask_local: PropTypes.func,
    markTaskComplete: PropTypes.func,
    markTaskComplete_local: PropTypes.func
};

const mapStateToProps = ({ firebase, firestore, auth, task }) => ({
    userId: firebase.auth.uid,
    tasks: firestore.data.tasks,
    test: task.test,
    displayTimer: auth.displayTimer,
    guestUser: auth.guestUser
});

const mapDispatchToProps = {
    selectTask,
    deleteTask,
    markTaskComplete,
    deleteTask_local,
    markTaskComplete_local,
    selectTask_local
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
