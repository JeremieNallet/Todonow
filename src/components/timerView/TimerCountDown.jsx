import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

const TimerCountDown = ({ options, isCounting }) => {
    const [mode, time] = options;
    return (
        <div className="timer-countdown">
            <span
                className={`timer-countdown__clock ${
                    mode === 'break' ? 'break-mode' : null
                } ${!isCounting && 'none-active'}`}
            >
                {moment(time).format('mm:ss')}{' '}
            </span>
        </div>
    );
};

TimerCountDown.propTypes = {
    options: PropTypes.array,
    isCounting: PropTypes.bool
};

export default TimerCountDown;
