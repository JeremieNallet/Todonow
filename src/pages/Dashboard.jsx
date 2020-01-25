import React from 'react';

// Components
import PageLayout from '../components/layout/PageLayout';
import Tasks from '../components/tasksView/Tasks';
import Timer from '../components/timerView/Timer';

const Dashboard = () => {
    return <PageLayout left={<Tasks />} right={<Timer />}></PageLayout>;
};

export default Dashboard;
