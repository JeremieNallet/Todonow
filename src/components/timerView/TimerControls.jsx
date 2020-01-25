import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from '../layout/Inputs';

const TimerControl = ({ activeStatus, isTimerActive, handlers, hasStarted }) => {
    const [isCounting, setIsCounting] = activeStatus;
    const [startTimer, setIsReseting] = handlers;

    return (
        <div className={`timer-control ${!isCounting ? 'not-active' : null}`}>
            <div className="timer-control--container">
                <Button
                    title={isCounting ? 'pause' : hasStarted ? 'resume' : 'start'}
                    type={isTimerActive ? 'btn-red' : 'btn-yellow'}
                    onClick={() => void [setIsCounting(!isCounting), startTimer()]}
                ></Button>
                {isTimerActive && (
                    <Button
                        title="reset timer"
                        type="btn-cancel"
                        onClick={() => setIsReseting(true)}
                    ></Button>
                )}
            </div>
        </div>
    );
};

TimerControl.propTypes = {
    handlers: PropTypes.arrayOf(PropTypes.func),
    activeStatus: PropTypes.array,
    isTimerActive: PropTypes.bool,
    hasStarted: PropTypes.bool
};

export default TimerControl;
