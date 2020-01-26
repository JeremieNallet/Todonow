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

const Statistics = ({ dataBase, localData, guestUser, userId }) => {
    const isEmpty = !dataBase || !dataBase[userId] || dataBase[userId].task.length === 0;
    const [globalPerc, setGlobalPerc] = useState(0);
    const [unCompletedVal, setUnCompletedVal] = useState({
        length: 0,
        time: '00:00s'
    });
    const [completedVal, setCompletedVal] = useState({
        length: 0,
        time: '00:00s'
    });

    const statisticsFrom = data => {
        const findList = boolean => data.find(val => val.completed === boolean);
        const hasCompleteTask = findList(true);
        const hasUnCompleteTask = findList(false);
        const completedTasks = data.filter(task => task.completed);
        const unCompletedTasks = data.filter(task => !task.completed);

        const calcAverageTime = val => {
            return val
                .map(task => task.time)
                .reduce((acc, curr) => {
                    return Math.floor((acc + curr) / data.length);
                });
        };
        const calcCompletedPerc = () => {
            return Math.floor((completedTasks.length * 100) / data.length);
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
    };

    useEffect(() => {
        if (guestUser) statisticsFrom(localData);
        else {
            if (isEmpty) return;
            else statisticsFrom(dataBase[userId].task);
        }
    }, [dataBase, guestUser, isEmpty, localData, userId]);

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

const mapStateToProps = ({ firebase, firestore, task, auth }) => ({
    dataBase: firestore.data.tasks,
    userId: firebase.auth.uid,
    localData: task.tasks,
    guestUser: auth.guestUser
});

const mapDispatchToProps = {};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => [`tasks/${props.userId}`])
)(Statistics);
