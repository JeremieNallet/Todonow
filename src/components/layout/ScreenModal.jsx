import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from './Inputs';

const ScreenModal = ({ onClick, closeModal, btnTitle, modalTitle }) => {
    return (
        <div className="screen-modal">
            <div className="screen-modal__inner">
                <div className="screen-modal__inner--title">
                    <h4>{modalTitle}</h4>
                </div>
                <div className="screen-modal__inner--btn">
                    <Button
                        className="screen-modal__inner--btn--item"
                        onClick={onClick}
                        title={btnTitle}
                        type="btn-red"
                    />
                    <Button
                        className="screen-modal__inner--btn--item"
                        onClick={closeModal}
                        title="Cancel"
                        type="btn-cancel"
                    />
                </div>
            </div>
        </div>
    );
};

ScreenModal.propTypes = {
    onClick: PropTypes.func,
    closeModal: PropTypes.func,
    btnTitle: PropTypes.string,
    modalTitle: PropTypes.string
};

export default ScreenModal;
