import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

// Components
import StatisticsState from './StatisticsState';
import StatisticsTime from './StatisticsTime';
import StatisticsHeader from './StatisticsHeader';
import PageLayout from '../layout/PageLayout';

//Store
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

const Statistics = ({ tasks, userId }) => {
    const isEmpty = !tasks || !tasks[userId] || tasks[userId].task.length === 0;
    const [globalPerc, setGlobalPerc] = useState(0);
    const [unCompletedVal, setUnCompletedVal] = useState({
        length: 0,
        time: '00:00s'
    });
    const [completedVal, setCompletedVal] = useState({
        length: 0,
        time: '00:00s'
    });

    useEffect(() => {
        if (isEmpty) {
            return;
        } else {
            const taskList = tasks[userId].task;
            const findList = boolean =>
                tasks[userId].task.find(val => val.completed === boolean);
            const hasCompleteTask = findList(true);
            const hasUnCompleteTask = findList(false);
            const completedTasks = taskList.filter(task => task.completed);
            const unCompletedTasks = taskList.filter(task => !task.completed);

            const calcAverageTime = val => {
                return val
                    .map(task => task.time)
                    .reduce((acc, curr) => {
                        return Math.floor((acc + curr) / taskList.length);
                    });
            };
            const calcCompletedPerc = () => {
                return Math.floor((completedTasks.length * 100) / taskList.length);
            };

            if (hasCompleteTask) {
                setCompletedVal({
                    length: completedTasks.length,
                    time: moment(calcAverageTime(completedTasks) * 1000).format('mm:ss')
                });
            }

            if (hasUnCompleteTask) {
                setUnCompletedVal({
                    length: unCompletedTasks.length,
                    time: moment(calcAverageTime(unCompletedTasks) * 1000).format('mm:ss')
                });
            }

            if (hasUnCompleteTask || hasCompleteTask) {
                setGlobalPerc(calcCompletedPerc());
                if (completedTasks.length > 0 && unCompletedTasks === 0) {
                    setGlobalPerc(100);
                }
            }
        }
    }, [isEmpty, tasks, userId]);

    return (
        <PageLayout
            withHeader
            header={<StatisticsHeader percentage={globalPerc} />}
            left={<StatisticsState values={[completedVal, unCompletedVal]} />}
            right={<StatisticsTime />}
        />
    );
};

Statistics.propTypes = {
    tasks: PropTypes.object,
    userId: PropTypes.string
};

const mapStateToProps = ({ firebase, firestore }) => ({
    tasks: firestore.data.tasks,
    userId: firebase.auth.uid
});

const mapDispatchToProps = {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(Statistics);
