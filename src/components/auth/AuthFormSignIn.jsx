import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
// Component
import AuthFormRecover from './AuthFormRecover';
import { Button, Input } from '../layout/Inputs';

// Store
import { signinUser, cleanUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const AuthFormSignIn = ({ signinUser, globalError, cleanUp, isLoading, onClick }) => {
    const [haveForgotten, setHaveForgotten] = useState(false);
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = async values => signinUser(values);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void cleanUp(), []);

    return (
        <>
            {!haveForgotten ? (
                <div className="auth-form">
                    <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form">
                        <div className="auth-form__form--title">
                            <h3>Login to your account</h3>
                        </div>
                        <div className="auth-form__form--fields">
                            <Input
                                name="email"
                                placeholder="email"
                                forwardRef={register({
                                    required: 'Required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: 'invalid email address'
                                    }
                                })}
                                error={errors.email && errors.email.message}
                            />
                            <Input
                                name="password"
                                type="password"
                                placeholder="password"
                                forwardRef={register({
                                    required: 'You must specify a password',
                                    minLength: {
                                        value: 6,
                                        message: 'Password must have at least 6 characters'
                                    }
                                })}
                                error={errors.password && errors.password.message}
                            />
                        </div>
                        <small className="auth-form__form--global-error">{globalError}</small>
                        <div className="auth-form__form--button">
                            <Button
                                isLoading={isLoading && 'loading'}
                                title="Login"
                                type="btn-blue"
                            />
                        </div>
                    </form>
                    <div className="auth-form__helper">
                        <span>
                            Did you forgot your password ?
                            <span
                                className="auth-form__helper--text"
                                onClick={() => setHaveForgotten(true)}
                            >
                                {' '}
                                Recover it.
                            </span>
                        </span>
                        <span className="auth-form__helper--text" onClick={onClick}>
                            Doesn't have an account ?
                        </span>
                    </div>
                </div>
            ) : (
                <AuthFormRecover onClick={() => setHaveForgotten(false)} />
            )}
        </>
    );
};

AuthFormSignIn.propTypes = {
    onClick: PropTypes.func,
    globalError: PropTypes.string,
    isLoading: PropTypes.bool,
    signinUser: PropTypes.func,
    cleanUp: PropTypes.func
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.loading,
    globalError: auth.error
});

const mapDispatchToProps = {
    signinUser,
    cleanUp
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthFormSignIn);
