import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button, Input } from '../layout/Inputs';

// Store
import { connect } from 'react-redux';
import { addOneTask, adOneTask_local } from '../../store/actions/tasksActions';

// Services / assets
import useAddTask from '../../services/hooks/useAddTask';
import { validateTask } from '../../assets/utils/validate';

const TaskAddForm = ({ adOneTask_local, addOneTask, isLoading, setIsAdding, guestUser }) => {
    const { handleChange, handleSubmit, values, errors } = useAddTask(
        guestUser ? adOneTask_local : addOneTask,
        validateTask,
        setIsAdding
    );

    return (
        <div className="task-add-form">
            <form noValidate onSubmit={handleSubmit} className="task-add-form__form">
                <Input
                    type="text"
                    error={errors.title}
                    value={values.title}
                    name="title"
                    label={!values.title && 'Task title'}
                    color="yellow"
                    onChange={handleChange}
                    className="task-add-form__form--input"
                />
                <textarea
                    label="You can add a description to it."
                    color="yellow"
                    type="description"
                    value={values.description}
                    placeholder="You can add details to it."
                    name="description"
                    onChange={handleChange}
                    className="task-add-form__form--textarea"
                ></textarea>
                <Button
                    className="task-add-form__form--btn"
                    isLoading={isLoading && 'loading'}
                    type="btn-blue"
                    title="add new todo"
                />
            </form>
        </div>
    );
};

TaskAddForm.propTypes = {
    addOneTask: PropTypes.func,
    isLoading: PropTypes.bool,
    setIsAdding: PropTypes.func
};

const mapStateToProps = ({ task, auth }) => ({
    isLoading: task.loading,
    guestUser: auth.guestUser
});

const mapDispatchToProps = {
    addOneTask,
    adOneTask_local
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskAddForm);
