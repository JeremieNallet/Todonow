import React from 'react';
import PropTypes from 'prop-types';

// Components
import LockedLayout from '../layout/LockedLayout';

// Services / assets
import { Settings } from '../../assets/svg/icons';

const TimerHeader = ({ title, type, onClick, isSettingOpen }) => {
    return (
        <LockedLayout className="timer-title">
            <div className="timer-title__text">
                <h3>{title}</h3>
            </div>
            <button onClick={onClick} className={`timer-title__button ${type}`}>
                <Settings
                    className={`timer-title__button--icon ${isSettingOpen ? 'open' : null}`}
                />
            </button>
        </LockedLayout>
    );
};

TimerHeader.propTypes = {
    title: PropTypes.string.isRequired,
    type: PropTypes.bool,
    onClick: PropTypes.func,
    isSettingOpen: PropTypes.bool
};

export default TimerHeader;
