import React from 'react';
import PropTypes from 'prop-types';

// Component
import PageLayout from '../components/layout/PageLayout';
import Tasks from '../components/tasksView/Tasks';
import ScreenModal from '../components/layout/ScreenModal';

// Store
import { connect } from 'react-redux';
import { deleteAllCompletedTasks, deleteAllCompleted_local } from '../store/actions/tasksActions';

import { toggleModal } from '../store/actions/UIActions';

const MyTasks = ({
    isModalOpen,
    toggleModal,
    deleteAllCompletedTasks,
    guestUser,
    deleteAllCompleted_local
}) => {
    const close = () => {
        toggleModal();
    };
    const open = () => {
        if (guestUser) {
            deleteAllCompleted_local();
        } else {
            deleteAllCompletedTasks();
        }
        toggleModal();
    };
    return (
        <>
            <PageLayout
                left={<Tasks completedList={false} />}
                right={<Tasks completedList={true} />}
            >
                <Tasks completedList={false} />
            </PageLayout>
            {isModalOpen && (
                <ScreenModal
                    modalTitle="Are you sure ?"
                    btnTitle="yes, delete all"
                    closeModal={close}
                    onClick={open}
                />
            )}
            s
        </>
    );
};

MyTasks.propTypes = {
    isModalOpen: PropTypes.bool,
    toggleModal: PropTypes.func,
    deleteAllCompletedTasks: PropTypes.func
};

const mapStateToProps = ({ ui, auth }) => ({
    isModalOpen: ui.isModalOpen,
    guestUser: auth.guestUser
});

const mapDispatchToProps = {
    deleteAllCompletedTasks,
    toggleModal,
    deleteAllCompleted_local
};

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks);
