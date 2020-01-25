import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Component
import AuthFormRecover from './AuthFormRecover';
import { Button, Input } from '../layout/Inputs';

// Store
import { signinUser, cleanUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

// Services / assests
import useForm from '../../services/hooks/useForm';
import { validateSignIn } from '../../assets/utils/validate';

const AuthFormSignIn = ({ signinUser, globalError, cleanUp, isLoading, onClick }) => {
    const [haveForgotten, setHaveForgotten] = useState(false);
    const { handleChange, handleSubmit, values, errors } = useForm(
        signinUser,
        validateSignIn,
        cleanUp
    );
    return (
        <>
            {!haveForgotten ? (
                <div className="auth-form">
                    <form noValidate onSubmit={handleSubmit} className="auth-form__form">
                        <div className="auth-form__form--title">
                            <h3>Login to your account</h3>
                        </div>
                        <div className="auth-form__form--fields">
                            <Input
                                error={errors.email}
                                onChange={handleChange}
                                type="email"
                                name="email"
                                label={!values.email && 'Your email ...'}
                                value={values.email}
                                errorClass={errors.email ? 'error-style' : null}
                            />
                            <Input
                                error={errors.password}
                                onChange={handleChange}
                                type="password"
                                name="password"
                                label={!values.password && 'Your password ...'}
                                value={values.password}
                                passwordClass="password-style"
                                errorClass={errors.password ? 'error-style' : null}
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
