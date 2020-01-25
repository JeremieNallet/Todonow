import React from 'react';
import PropTypes from 'prop-types';
import { useSpring, animated as a } from 'react-spring';

// Store
import { connect } from 'react-redux';

const LockedLayout = ({ className, isTimerActive, children, scaleFx = false }) => {
    const props = useSpring({
        opacity: isTimerActive ? 0.6 : 1,
        pointerEvents: isTimerActive ? 'none' : 'initial',
        transform: isTimerActive && scaleFx ? 'scale(0.98)' : 'scale(1)'
    });
    return (
        <a.div style={props} className={className}>
            {children}
        </a.div>
    );
};
LockedLayout.propTypes = {
    className: PropTypes.string,
    isTimerActive: PropTypes.bool,
    children: PropTypes.node.isRequired
};

const mapStateToProps = ({ timer }) => ({
    isTimerActive: timer.isTimerActive
});

export default connect(mapStateToProps, null)(LockedLayout);
