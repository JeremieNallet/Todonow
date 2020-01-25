import React from 'react';
import PropTypes from 'prop-types';
import { AuthImg } from '../assets/svg/Images';

// Store
import { connect } from 'react-redux';
import { closePasswordModal } from '../store/actions/authActions';
import { openLogin, openSignup } from '../store/actions/UIActions';

// Components
import AuthFromSignUp from '../components/auth/AuthFromSignUp';
import AuthFormSignIn from '../components/auth/AuthFormSignIn';
import AuthLayout from '../components/layout/AuthLayout';
import ScreenModal from '../components/layout/ScreenModal';

const Auth = ({ emailSent, closePasswordModal, openLogin, openSignup, hasAccount }) => {
    return (
        <>
            <AuthLayout>
                <AuthImg />
                {hasAccount ? (
                    <AuthFormSignIn onClick={() => openSignup()} />
                ) : (
                    <AuthFromSignUp onClick={() => openLogin()} />
                )}
                <ScreenModal />
            </AuthLayout>
            {emailSent && (
                <ScreenModal
                    closeModal={() => closePasswordModal()}
                    onClick={() => closePasswordModal()}
                />
            )}
        </>
    );
};

Auth.propTypes = {
    emailSent: PropTypes.bool,
    closePasswordModal: PropTypes.func
};

const mapStateToProps = ({ auth, ui }) => ({
    emailSent: auth.recoverPassword.emailSent,
    hasAccount: ui.hasAccount
});

const mapDispatchToProps = {
    openLogin,
    openSignup,
    closePasswordModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
