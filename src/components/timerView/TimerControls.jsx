import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button } from '../layout/Inputs';

const TimerControl = ({ state, setters, audio, timerHasStarted }) => {
    const [setIsCounting, setIsReseting, setTime, setMode] = setters;
    const [mode, isTimerActive, isCounting, sessionVal] = state;

    const timer = {
        sessionPending: mode === 'session',
        sessionStarted: mode === 'session' && isCounting === true,
        breakPending: mode === 'break' && isCounting === false,
        breakStarted: mode === 'break' && isCounting === true
    };

    const cancelBreak = () => {
        setMode('session');
        setTime(sessionVal * 60 * 1000);
    };

    const startTimer = () => {
        setIsCounting(!isCounting);
        timerHasStarted();
        audio.pause();
        audio.currentTime = 0;
    };

    let btnTile = `${isCounting ? 'pause' : isTimerActive ? 'resume' : 'start'}`;

    const resetTimer = () => setIsReseting(true);

    return (
        <div className={`timer-control ${!isCounting ? 'not-active' : null}`}>
            <div className="timer-control--container">
                {timer.sessionPending && (
                    <Button type={'btn-yellow'} title={btnTile} onClick={startTimer} />
                )}
                {timer.sessionStarted && (
                    <Button title="reset timer" type="btn-cancel" onClick={resetTimer} />
                )}
                {timer.breakPending && (
                    <Button type={'btn-red'} title="start break" onClick={startTimer} />
                )}
                {timer.breakStarted && (
                    <Button title="cancel break" type="btn-red" onClick={cancelBreak} />
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
