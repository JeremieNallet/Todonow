import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from '../layout/Inputs';

const ConfirmModal = ({ title, description, closeModal, triggerAction, btnTitle }) => {
    return (
        <div className="confirm-modal">
            <div className="confirm-modal__text">
                <span className="confirm-modal__text--title">{title}</span>
                <span className="confirm-modal__text--description">{description}</span>
            </div>
            <div className="confirm-modal__btn">
                <Button
                    className="confirm-modal__btn--item"
                    onClick={closeModal}
                    title="cancel"
                    type="btn-cancel"
                />
                <Button
                    className="confirm-modal__btn--item"
                    onClick={triggerAction}
                    title={btnTitle}
                    type="btn-red"
                />
            </div>
        </div>
    );
};

ConfirmModal.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    btnTitle: PropTypes.string.isRequired,
    triggerAction: PropTypes.func,
    closeModal: PropTypes.func
};

export default ConfirmModal;
