import React from 'react';
import PropTypes from 'prop-types';

// Componenets
import LockedLayout from './LockedLayout';

// Store
import { connect } from 'react-redux';

const PageLayout = ({ left, right, header, withHeader = false }) => {
    return (
        <div className="page-layout">
            {withHeader && <div className="page-layout__header">{header}</div>}
            <div className="page-layout__column">
                <LockedLayout scaleFx className="page-layout__column__left">
                    {left}
                </LockedLayout>
                <div className="page-layout__column__right">{right}</div>
            </div>
        </div>
    );
};

PageLayout.propTypes = {
    left: PropTypes.node.isRequired,
    right: PropTypes.node.isRequired,
    header: PropTypes.node
};

const mapStateToProps = ({ timer }) => ({
    isTimerActive: timer.isTimerActive
});

export default connect(mapStateToProps, null)(PageLayout);
