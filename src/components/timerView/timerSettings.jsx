import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

//Components
import { RangeInput, Button } from '../layout/Inputs';

const TimerSettings = ({ state, setters }) => {
    const [breakVal] = state;
    const [sessionVal, setSessionVal, setBreakVal, setIsSettingOpen] = setters;

    const [savedSession, setSaveSession] = useState(sessionVal);
    const [savedBreak, setSavedBreak] = useState(breakVal);

    const saveValues = () => {
        setIsSettingOpen(false);
        setSessionVal(savedSession);
        setBreakVal(savedBreak);
    };

    return (
        <div className="timer-settings">
            <div className="timer-settings__group">
                <div className="container">
                    <span className="timer-settings__group--text">
                        Timer duration :
                        <span>{moment(savedSession * 60 * 1000).format('mm:ss')}</span>
                    </span>

                    <div className="timer-settings__group--sliders">
                        <RangeInput
                            color="blue"
                            value={savedSession}
                            max="50"
                            onChange={e => setSaveSession(e.target.value)}
                        />
                    </div>
                </div>
                <div className="container">
                    <span className="timer-settings__group--text">
                        Break duration:
                        <span>{moment(savedBreak * 60 * 1000).format('mm:ss')}</span>
                    </span>

                    <div className="timer-settings__group--sliders">
                        <RangeInput
                            color="red"
                            value={savedBreak}
                            max="15"
                            onChange={e => setSavedBreak(e.target.value)}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="timer-settings__save-btn">
                        <Button
                            onClick={() => saveValues()}
                            type="btn-yellow"
                            title="save settings"
                        />
                        <Button
                            onClick={() => setIsSettingOpen(false)}
                            type="btn-cancel"
                            title="cancel"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

TimerSettings.propTypes = {
    sessionSetting: PropTypes.array,
    breakSettings: PropTypes.array,
    setIsSettingOpen: PropTypes.func
};

export default TimerSettings;
