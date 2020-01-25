import React from 'react';
import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="auth-layout__img">
                <div className="auth-layout__img--container">{children[0]}</div>
            </div>
            <div className="auth-layout__form">
                <div className="auth-layout__form--container">{children[1]}</div>
            </div>
        </div>
    );
};

AuthLayout.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthLayout;
