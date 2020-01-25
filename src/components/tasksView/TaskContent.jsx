import React from 'react';
import PropTypes from 'prop-types';

const TaskContent = ({ onClick, task }) => {
    return (
        <div className="task-content">
            {!task.completed && (
                <div onClick={onClick} className="task-content__selector">
                    <span
                        className={`task-content__selector--shape ${
                            task.selected ? 'active' : null
                        }`}
                    />
                </div>
            )}

            <div className="task-content__text">
                <h6 className={`task-content__text--title ${task.completed && 'completed'}`}>
                    {task.title}
                </h6>
                <p className="task-content__text--body">{task.description}</p>
            </div>
        </div>
    );
};

TaskContent.propTypes = {
    onClick: PropTypes.func,
    task: PropTypes.object
};

export default TaskContent;
