import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

//component
import TimerControl from './TimerControls';
import TimerSettings from './timerSettings';
import TimerHeader from './TimerHeader';
import TimerModal from './TimerModal';
import TimerCountDown from './TimerCountDown';

// Store
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import {
    markTaskComplete,
    markTaskComplete_nodb,
    selectTask_nodb,
    saveTimeSpent_nodb
} from '../../store/actions/tasksActions';
import { toggleTimer, stopTimer } from '../../store/actions/timerActions';

// Services / assets
import useInterval from '../../services/hooks/useInterval';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const Timer = ({
    dataBase,
    userId,
    markTaskComplete,
    toggleTimer,
    stopTimer,
    isTimerActive,
    guestUser,
    localData,
    markTaskComplete_nodb,
    selectTask_nodb,
    saveTimeSpent_nodb
}) => {
    const [breakVal, setBreakVal] = useState(5);
    const [sessionVal, setSessionVal] = useState(25);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isReseting, setIsReseting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [mode, setMode] = useState('session');
    const [time, setTime] = useState(sessionVal * 60 * 1000);
    const [taskInfo, setTaskInfo] = useState({ id: null, title: null });
    const [timeSpend, setTimeSpend] = useState(0);

    const [hasStarted, setHasStarted] = useState(false);
    const taskEmpty = !dataBase || !dataBase[userId] || dataBase[userId].task.length === 0;
    const [taskSelected, setTaskselected] = useState(false);
    const history = useHistory();
    const firestore = useFirestore();

    useInterval(() => setTime(time - 1000), isCounting ? 1000 : null);
    useInterval(() => setTimeSpend(time => time + 1), isCounting ? 1000 : null);

    useEffect(() => void setTime(sessionVal * 60 * 1000), [sessionVal]);

    const setViewOptionFrom = data => {
        data.find(task => task.selected && setTaskInfo({ id: task.id, title: task.title }));
        data.find(task => task.selected && setHasStarted(task.time > 0 ? true : false));
    };
    const selectTaskFrom = data => {
        const taskSelected = data.find(task => task.selected);
        setTaskselected(taskSelected);
    };

    useEffect(() => {
        if (guestUser) {
            setViewOptionFrom(localData);
            selectTaskFrom(localData);
        } else {
            if (taskEmpty) return;
            else {
                setViewOptionFrom(dataBase[userId].task);
                selectTaskFrom(dataBase[userId].task);
            }
        }
    }, [guestUser, taskEmpty, dataBase, localData, userId]);

    useEffect(() => {
        const data = localStorage.getItem('timer');
        if (data) setTime(JSON.parse(data));
    }, []);

    useEffect(() => {
        localStorage.setItem('timer', JSON.stringify(time));
    });

    useEffect(() => {
        if (time === 0 && mode === 'session') {
            setMode('break');
            setTime(breakVal * 60 * 1000);
        } else if (time === 0 && mode === 'break') {
            setMode('session');
            setTime(sessionVal * 60 * 1000);
        }
    }, [time, breakVal, sessionVal, mode]);

    const resetTimer = () => {
        setIsCounting(false);
        setMode('session');
        setTime(sessionVal * 60 * 1000);
        setIsReseting(false);
        stopTimer();
    };

    const markAsComplete = () => {
        guestUser ? markTaskComplete_nodb(taskInfo.id) : markTaskComplete(taskInfo.id);
        setTime(sessionVal * 60 * 1000);
        setIsCounting(false);
        setIsCompleted(false);
        stopTimer();
    };

    console.log(timeSpend, 'state');

    const saveTimeSpend = useCallback(async () => {
        if (!guestUser) {
            const res = await firestore
                .collection('tasks')
                .doc(userId)
                .get();
            const task = res.data().task;
            task.forEach(task => {
                if (task.id === taskInfo.id) {
                    task.time += timeSpend;
                    console.log(task.time, 'data');
                }
            });
            await firestore
                .collection('tasks')
                .doc(userId)
                .update({ task });
        }
    }, [firestore, guestUser, taskInfo.id, timeSpend, userId]);

    useEffect(() => {
        history.listen(() => {
            if (history.location.pathname === '/statistics') saveTimeSpend();
        });
    }, [history, saveTimeSpend]);

    return (
        <>
            <TimerHeader
                title={isSettingOpen ? 'Settings' : 'Your timer'}
                onClick={() => setIsSettingOpen(true)}
                isTimerActive={isTimerActive}
                isSettingOpen={isSettingOpen}
            />
            <div style={{ minHeight: isSettingOpen ? '50rem' : '69rem' }} className="timer">
                <div className="timer__view">
                    {isSettingOpen && (
                        <TimerSettings
                            sessionSetting={[sessionVal, setSessionVal]}
                            breakSettings={[breakVal, setBreakVal]}
                            setIsSettingOpen={setIsSettingOpen}
                        />
                    )}
                    {taskSelected && (
                        <>
                            <TimerCountDown options={[mode, time]} isCounting={isCounting} />
                            <TimerControl
                                hasStarted={hasStarted}
                                activeStatus={[isCounting, setIsCounting]}
                                handlers={[toggleTimer, setIsReseting]}
                                isTimerActive={isTimerActive}
                            />

                            {isReseting && (
                                <TimerModal
                                    btnText="reset"
                                    actionModal={() => resetTimer()}
                                    closeModal={() => setIsReseting(false)}
                                />
                            )}
                            {isCompleted && (
                                <TimerModal
                                    btnText="Yes, mark it as complete"
                                    actionModal={markAsComplete}
                                    closeModal={() => setIsCompleted(false)}
                                />
                            )}
                        </>
                    )}

                    {!taskSelected && !isSettingOpen && (
                        <div className="timer__view--disabled">
                            <TimerCountDown options={[mode, time]} isCounting={isCounting} />
                            <span>Select a task to activate the timer</span>
                        </div>
                    )}
                </div>
                {taskSelected && !isSettingOpen && (
                    <div className="timer__indicator">
                        <p>
                            {taskInfo.title}' selected !{' '}
                            <span onClick={() => setIsCompleted(true)}>
                                Mark it as completed ?
                            </span>
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

Timer.propTypes = {
    tasks: PropTypes.object,
    userId: PropTypes.string,
    markTaskComplete: PropTypes.func,
    toggleTimer: PropTypes.func,
    stopTimer: PropTypes.func,
    isTimerActive: PropTypes.bool,
    isOneTaskSelected: PropTypes.bool
};

const mapStateToProps = ({ firebase, firestore, timer, task, auth }) => ({
    userId: firebase.auth.uid,
    dataBase: firestore.data.tasks,
    isTimerActive: timer.isTimerActive,
    displayTimer: task.displayTimer,
    guestUser: auth.guestUser,
    localData: task.tasks
});

const mapDispatchToProps = {
    markTaskComplete,
    toggleTimer,
    stopTimer,
    markTaskComplete_nodb,
    selectTask_nodb,
    saveTimeSpent_nodb
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(Timer);
