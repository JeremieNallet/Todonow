import React, { useState } from 'react';
import PropTypes from 'prop-types';
// Components
import { Button, Input } from '../layout/Inputs';

// Store
import { connect } from 'react-redux';
import { editTask, editTask_local } from '../../store/actions/tasksActions';

const TaskEditForm = ({ closeModal, task, editTask, isLoading, editTask_local, guestUser }) => {
    const [values, setValues] = useState({
        title: task.title,
        description: task.description
    });

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        if (guestUser) {
            editTask_local(task.id, values);
            closeModal();
        } else {
            const res = await editTask(task.id, values);
            if (res) {
                closeModal();
            }
        }
    };
    return (
        <form onSubmit={handleSubmit} className="task-edit-form">
            <Input
                className="task-edit-form--input"
                type="text"
                value={values.title}
                name="title"
                onChange={handleChange}
            />
            <textarea
                className="task-edit-form--textarea"
                value={values.description}
                name="description"
                onChange={handleChange}
            />
            <div className="task-edit-form__btn-group">
                <Button
                    className="task-edit-form__btn-group--item"
                    onClick={closeModal}
                    title="cancel"
                    type="btn-cancel"
                />
                <Button
                    className="task-edit-form__btn-group--item"
                    title="edit"
                    type="btn-red"
                    isLoading={isLoading && 'loading'}
                />
            </div>
        </form>
    );
};

TaskEditForm.propTypes = {
    closeModalonClick: PropTypes.func,
    editTask: PropTypes.func,
    isLoading: PropTypes.bool,
    task: PropTypes.object
};

const mapStateToProps = ({ task, auth }) => ({
    isLoading: task.loading,
    guestUser: auth.guestUser
});

const mapDispatchToProps = {
    editTask,
    editTask_local
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskEditForm);
