import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from '../layout/Inputs';

const TimerModal = ({ btnText, actionModal, closeModal }) => {
    return (
        <div className="timer-modal">
            <span className="timer-modal__text">Are you sure ?</span>
            <div className="timer-modal__control">
                <Button onClick={actionModal} title={btnText} type="btn-red"></Button>
                <Button onClick={closeModal} title="cancel" type="btn-cancel"></Button>
            </div>
        </div>
    );
};

TimerModal.propTypes = {
    btnText: PropTypes.string.isRequired,
    actionModal: PropTypes.func,
    closeModal: PropTypes.func
};

export default TimerModal;
