import React from 'react';
import PropTypes from 'prop-types';

const StatisticsState = ({ values }) => {
    const [completedVal, unCompletedVal] = values;
    const cells = [
        {
            id: 1,
            title: 'completed todos',
            backgroundColor: 'var(--primary-color)',
            averageTime: completedVal.time,
            numberOfTasks: completedVal.length
        },
        {
            id: 2,
            title: 'uncomplete todos',
            backgroundColor: 'var(--color-red)',
            averageTime: unCompletedVal.time,
            numberOfTasks: unCompletedVal.length
        }
    ];
    return (
        <div className="stats-state">
            {cells.map(_ => (
                <div
                    key={_.id}
                    style={{ backgroundColor: _.backgroundColor }}
                    className="stats-state__cell"
                >
                    <div className="stats-state__cell__text">
                        <span className="stats-state__cell__text--title">{_.title}</span>
                        <span className="stats-state__cell__text--av-time">
                            average time spent {_.averageTime}
                        </span>
                    </div>
                    <div className="stats-state__cell__total">{_.numberOfTasks}</div>
                </div>
            ))}
        </div>
    );
};
StatisticsState.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object)
};

export default StatisticsState;
