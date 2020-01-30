import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from '../layout/Inputs';

const TimerControl = ({
    isCounting,
    setIsReseting,
    mode,
    cancelBreak,
    startTimer,
    isTimerActive
}) => {
    return (
        <div className={`timer-control ${!isCounting ? 'not-active' : null}`}>
            <div className="timer-control--container">
                {mode === 'session' && (
                    <Button
                        type={'btn-yellow'}
                        s
                        title={`${isCounting ? 'pause' : isTimerActive ? 'resume' : 'start'}`}
                        onClick={startTimer}
                    />
                )}
                {mode === 'break' && isCounting === false && (
                    <Button type={'btn-red'} title="start break" onClick={startTimer} />
                )}
                {mode === 'break' && isCounting === true && (
                    <Button title="cancel break" type="btn-red" onClick={cancelBreak} />
                )}
                {mode === 'session' && isCounting === true && (
                    <Button
                        title="reset timer"
                        type="btn-cancel"
                        onClick={() => setIsReseting(true)}
                    />
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
