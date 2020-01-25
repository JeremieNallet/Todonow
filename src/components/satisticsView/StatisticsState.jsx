import React from 'react';
import PropTypes from 'prop-types';

const StatisticsState = ({ values }) => {
    const [completedVal, unCompletedVal] = values;
    const cells = [
        {
            id: 1,
            backgroundColor: 'var(--primary-color)',
            averageTime: completedVal.time,
            numberOfTasks: completedVal.length
        },
        {
            id: 2,
            backgroundColor: 'var(--color-red)',
            averageTime: unCompletedVal.time,
            numberOfTasks: unCompletedVal.length
        }
    ];
    return (
        <div className="stats-state">
            {cells.map(val => (
                <div
                    key={val.id}
                    style={{ backgroundColor: val.backgroundColor }}
                    className="stats-state__cell"
                >
                    <div className="stats-state__cell__text">
                        <span className="stats-state__cell__text--title">Completed todos</span>
                        <span className="stats-state__cell__text--av-time">
                            average time spent {val.averageTime}s
                        </span>
                    </div>
                    <div className="stats-state__cell__total">{val.numberOfTasks}</div>
                </div>
            ))}
        </div>
    );
};
StatisticsState.propTypes = {
    values: PropTypes.arrayOf(PropTypes.object)
};

export default StatisticsState;
