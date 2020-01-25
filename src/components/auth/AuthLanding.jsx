import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { openLogin, openSignup } from '../../store/actions/UIActions';
import { logGuestUser } from '../../store/actions/authActions';

const Landing = ({ openSignup, openLogin, logGuestUser }) => (
    <div className="auth-landing">
        <h2 className="auth-landing__title">Get things done !</h2>
        <div className="auth-landing__btns">
            <Link onClick={() => openLogin()} to="/auth" className="button btn-blue">
                Sigin in
            </Link>
            <Link onClick={() => openSignup()} to="/auth" className="button btn-blue-outline">
                Create your account
            </Link>
            <button className="guest-user-btn" onClick={logGuestUser}>
                Connect as a guest.
            </button>
        </div>
    </div>
);

const mapDispatchToProps = {
    openSignup,
    openLogin,
    logGuestUser
};

export default connect(null, mapDispatchToProps)(Landing);
