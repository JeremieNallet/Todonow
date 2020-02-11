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
    markTaskComplete_local,
    selectTask_local,
    saveTimeSpent_local
} from '../../store/actions/tasksActions';
import { timerHasStarted, timerHasStopped } from '../../store/actions/timerActions';

// Services / assets
import useInterval from '../../services/hooks/useInterval';
import { useFirestore } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

const Timer = ({
    dataBase,
    userId,
    markTaskComplete,
    timerHasStarted,
    timerHasStopped,
    isTimerActive,
    guestUser,
    localData,
    markTaskComplete_local,
    saveTimeSpent_local
}) => {
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const [isReseting, setIsReseting] = useState(false);
    const [isCounting, setIsCounting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [taskSelected, setTaskSelected] = useState(false);

    const [breakVal, setBreakVal] = useState(5);
    const [sessionVal, setSessionVal] = useState(25);
    const [mode, setMode] = useState('session');
    const [taskInfo, setTaskInfo] = useState({ id: null, title: null });
    const [timeSpend, setTimeSpend] = useState(0);
    const [time, setTime] = useState();

    const taskEmpty = !dataBase || !dataBase[userId] || dataBase[userId].task.length === 0;
    const history = useHistory();
    const firestore = useFirestore();

    const initialTimerSettings = useCallback(() => {
        setIsCounting(false);
        setMode('session');
        setTime(sessionVal * 60 * 1000);
        setIsReseting(false);
        timerHasStopped();
    }, [sessionVal, timerHasStopped]);

    const [audio] = useState(new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'));
    useInterval(() => onTick(), isCounting ? 1000 : null);
    useEffect(() => void setTime(sessionVal * 60 * 1000), [sessionVal]);
    useEffect(() => void initialTimerSettings(), [initialTimerSettings]);

    const onTick = () => {
        setTime(time => time - 1000);
        setTimeSpend(time => time + 1);
        saveTimeSpent_local(taskInfo.id);
    };

    const displayTaskTitleOnTimer = data => {
        data.find(task => task.selected && setTaskInfo({ id: task.id, title: task.title }));
    };

    const getCurrentSelectedTask = data => {
        const taskSelected = data.find(task => task.selected);
        setTaskSelected(taskSelected);
    };

    useEffect(() => {
        if (guestUser) {
            displayTaskTitleOnTimer(localData);
            getCurrentSelectedTask(localData);
        } else {
            if (taskEmpty) return;
            else {
                displayTaskTitleOnTimer(dataBase[userId].task);
                getCurrentSelectedTask(dataBase[userId].task);
            }
        }
    }, [guestUser, taskEmpty, dataBase, localData, userId]);

    useEffect(() => {
        try {
            const data = localStorage.getItem('timer');
            if (data) setTime(JSON.parse(data));
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        try {
            window.localStorage.setItem('timer', JSON.stringify(time));
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (time === 0 && mode === 'session') {
            setMode('break');
            setTime(breakVal * 60 * 1000);
            setIsCounting(false);
            audio.play();
            audio.loop = true;
        } else if (time === 0 && mode === 'break') {
            setMode('session');
            setTime(sessionVal * 60 * 1000);
            audio.play();
            audio.loop = false;
        }
    }, [time, breakVal, sessionVal, mode, timerHasStarted, audio]);

    const markAsComplete = () => {
        guestUser ? markTaskComplete_local(taskInfo.id) : markTaskComplete(taskInfo.id);
        setTime(sessionVal * 60 * 1000);
        setIsCounting(false);
        setIsCompleted(false);
        timerHasStopped();
    };

    const resetTimer = () => initialTimerSettings();

    useEffect(() => {
        if (taskEmpty) {
            return;
        } else {
            history.listen(() => {
                if (history.location.pathname === '/statistics') {
                    (async () => {
                        if (!guestUser) {
                            const res = await firestore
                                .collection('tasks')
                                .doc(userId)
                                .get();
                            const task = res.data().task;
                            task.forEach(task => {
                                if (task.id === taskInfo.id) {
                                    task.timeSpend += timeSpend;
                                }
                            });
                            await firestore
                                .collection('tasks')
                                .doc(userId)
                                .update({ task });
                        }
                    })();
                }
            });
        }
    }, [firestore, guestUser, history, taskEmpty, taskInfo.id, timeSpend, userId]);

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
                            setters={[sessionVal, setSessionVal, setBreakVal, setIsSettingOpen]}
                            state={[breakVal]}
                        />
                    )}
                    {taskSelected && (
                        <>
                            <TimerCountDown options={[mode, time]} isCounting={isCounting} />
                            <TimerControl
                                setters={[setIsCounting, setIsReseting, setTime, setMode]}
                                state={[mode, isTimerActive, isCounting, sessionVal]}
                                timerHasStarted={timerHasStarted}
                                audio={audio}
                            />

                            {isReseting && (
                                <TimerModal
                                    btnText="Reset timer."
                                    actionModal={() => resetTimer()}
                                    closeModal={() => setIsReseting(false)}
                                />
                            )}
                            {isCompleted && (
                                <TimerModal
                                    btnText="Mark task as completed."
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
                            <span onClick={() => setIsCompleted(true)}>Mark it as completed ?</span>
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
    timerHasStarted: PropTypes.func,
    timerHasStopped: PropTypes.func,
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
    timerHasStarted,
    timerHasStopped,
    markTaskComplete_local,
    selectTask_local,
    saveTimeSpent_local
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(Timer);
