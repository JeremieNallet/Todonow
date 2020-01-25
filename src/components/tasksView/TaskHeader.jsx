import React from 'react';
import PropTypes from 'prop-types';

// Services / assests
import { Add, Delete } from '../../assets/svg/icons';

// Components
import { SearchInput } from '../layout/Inputs';

const TaskHeader = ({ completedList, headerBtnActions, isAdding, filter }) => {
    const [setFilterTasks, filterTasks] = filter;
    return (
        <>
            <div className="task-header">
                <div className="task-header__text">
                    <h3>{completedList ? 'Completed todos' : 'Your todos'}</h3>
                </div>
                <button
                    onClick={headerBtnActions}
                    className={`task-header__button ${completedList ? 'delete' : 'add'}`}
                >
                    {!completedList ? (
                        <Add className={`task-header__button--icon ${isAdding && 'active'}`} />
                    ) : (
                        <Delete className="task-header__button--icon delete-icon" />
                    )}
                </button>
            </div>
            <SearchInput
                name="search"
                onChange={e => setFilterTasks(e.target.value)}
                label="Search for a task"
                value={filterTasks}
            />
        </>
    );
};

TaskHeader.propTypes = {
    completedList: PropTypes.bool,
    headerBtnActions: PropTypes.func,
    isAdding: PropTypes.bool,
    filter: PropTypes.array
};

export default TaskHeader;
