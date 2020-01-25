import React from 'react';
import PropTypes from 'prop-types';

// Services / assets
import { StatsImage } from '../../assets/svg/Images';

const StatisticsHeader = ({ percentage }) => {
    return (
        <div className="stats-header">
            <div className="stats-header__text">
                <div>You have completed {isNaN(percentage) ? '0' : percentage}%</div>
                <span>of all your todos.</span>
            </div>
            <div className="stats-header__img">
                <StatsImage className="stats-header__img--svg" />
            </div>
        </div>
    );
};

StatisticsHeader.propTypes = {
    percentage: PropTypes.number
};

export default StatisticsHeader;
