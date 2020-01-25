import React from 'react';
import PropTypes from 'prop-types';

// Services / assets
import { ActionMenu, Delete } from '../../assets/svg/icons';

const TaskMenuBtn = ({ isTaskCompleted, handlers, isTaskSelected }) => {
    const [setIsDeleting, setIsCompleted, setIsEditing] = handlers;
    return (
        <button className="task-menu-btn">
            {!isTaskCompleted ? (
                <>
                    <ActionMenu
                        style={{
                            fill: isTaskSelected ? 'var(--color-yellow)' : 'var(--color-grey)'
                        }}
                    />
                    <div className="task-menu-btn__options">
                        <span onClick={() => setIsEditing(true)}>Edit your todo</span>
                        <span onClick={() => setIsDeleting(true)}>Delete your todo</span>
                        <span onClick={() => setIsCompleted(true)}>Mark as completed</span>
                    </div>
                </>
            ) : (
                <>
                    <Delete
                        onClick={() => setIsDeleting(true)}
                        className="task-menu-btn__delete-icon"
                    />
                </>
            )}
        </button>
    );
};

TaskMenuBtn.propTypes = {
    isTaskCompleted: PropTypes.bool,
    handle: PropTypes.arrayOf(PropTypes.func),
    isTaskSelected: PropTypes.bool
};

export default TaskMenuBtn;
