import React from 'react';
import PropTypes from 'prop-types';
// Store
import { connect } from 'react-redux';
import { signupUser, cleanUp } from '../../store/actions/authActions';

// Components
import { Button, Input } from '../layout/Inputs';

// Services / assests
import useForm from '../../services/hooks/useForm';
import { validateSignup } from '../../assets/utils/validate';

const AuthFromSignUp = ({ isLoading, signupUser, cleanUp, globalError, onClick }) => {
    const { handleSubmit, handleChange, values, errors } = useForm(
        signupUser,
        validateSignup,
        cleanUp
    );

    return (
        <div className="auth-form">
            <form noValidate onSubmit={handleSubmit} className="auth-form__form auth-signup">
                <div className="auth-form__form--title">
                    <h3>Create your account</h3>
                </div>
                <div className="auth-form__form--fields">
                    <Input
                        label={!values.email && 'Your email address'}
                        type="email"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                        error={errors.email}
                        errorClass={errors.email && 'error-style'}
                    />
                    <Input
                        label={!values.password && 'choose a password'}
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                        error={errors.password}
                        errorClass={errors.password && 'error-style'}
                        passwordClass="password-style"
                    />
                    <Input
                        label={!values.confirmPassword && 'choose a password'}
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        error={errors.confirmPassword}
                        errorClass={errors.confirmPassword && 'error-style'}
                        passwordClass="password-style"
                    />
                </div>
                <small className="auth-form__form--global-error">{globalError}</small>
                <div className="auth-form__form--button">
                    <Button
                        isLoading={isLoading && 'loading'}
                        title="Create your account"
                        type="btn-blue"
                    />
                </div>
            </form>
            <span className="auth-form__helper login-helper">
                <span onClick={onClick} className="auth-form__helper--text">
                    Login to your account
                </span>
            </span>
        </div>
    );
};
AuthFromSignUp.propTypes = {
    onClick: PropTypes.func,
    globalError: PropTypes.string,
    isLoading: PropTypes.bool,
    signupUser: PropTypes.func,
    cleanUp: PropTypes.func
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.loading,
    globalError: auth.error
});

const mapDispatchToProps = {
    signupUser,
    cleanUp
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFromSignUp);
