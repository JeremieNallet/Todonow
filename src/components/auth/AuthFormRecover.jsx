import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

// Components
import { Button, Input } from '../layout/Inputs';

// Store
import { recoverPassword, cleanUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const RecoverForm = ({ onClick, recoverPassword, globalError, isLoading, emailSent, cleanUp }) => {
    const { handleSubmit, register, errors } = useForm();

    const onSubmit = async values => recoverPassword(values);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void cleanUp(), []);

    const formatError = globalError => {
        if (globalError) return 'User email not found';
    };

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form auth-recover">
                <div className="auth-form__form--title">
                    <h3>Recover your password</h3>
                </div>
                <div className="auth-form__form--fields">
                    <Input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        forwardRef={register({
                            required: 'Required',
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                message: 'invalid email address'
                            }
                        })}
                        error={(errors.email && errors.email.message) || formatError(globalError)}
                    />
                </div>
                <div className="auth-form__form--button">
                    <Button
                        title="Send me an email"
                        type="btn-blue"
                        isLoading={isLoading && 'loading'}
                        onClick={emailSent ? onClick() : null}
                    />
                </div>
            </form>
            <span onClick={onClick} className="auth-form__helper">
                <span className="auth-form__helper--text">Login to your account</span>
            </span>
        </div>
    );
};

RecoverForm.propTypes = {
    onClick: PropTypes.func,
    recoverPassword: PropTypes.func,
    globalError: PropTypes.string,
    isLoading: PropTypes.bool,
    emailSent: PropTypes.bool,
    cleanUp: PropTypes.func
};

const mapStateToProps = ({ auth }) => ({
    isLoading: auth.recoverPassword.loading,
    globalError: auth.recoverPassword.error,
    emailSent: auth.recoverPassword.emailSent
});

const mapDispatchToProps = {
    recoverPassword,
    cleanUp
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverForm);
