import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Store
import { connect } from 'react-redux';
import { signupUser, cleanUp } from '../../store/actions/authActions';

// Components
import { Button, Input } from '../layout/Inputs';

// Services / assests
import { useForm } from 'react-hook-form';

const AuthFromSignUp = ({ isLoading, signupUser, cleanUp, globalError, onClick }) => {
    const { handleSubmit, register, errors, watch } = useForm();
    const onSubmit = async values => signupUser(values);
    const password = React.useRef({});
    password.current = watch('password', '');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => void cleanUp(), []);

    return (
        <div className="auth-form">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form__form">
                <div className="auth-form__form--title">
                    <h3>Create your account</h3>
                </div>
                <div className="auth-form__form--fields">
                    <Input
                        name="email"
                        placeholder="Your email ..."
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
                        placeholder="Your password ..."
                        name="password"
                        type="password"
                        forwardRef={register({
                            required: 'You must specify a password',
                            minLength: {
                                value: 8,
                                message: 'Password must have at least 8 characters'
                            }
                        })}
                        error={errors.password && errors.password.message}
                    />
                    <Input
                        placeholder="Comfirm password..."
                        name="password_repeat"
                        type="password"
                        forwardRef={register({
                            validate: value =>
                                value === password.current || 'The passwords do not match'
                        })}
                        error={errors.password_repeat && errors.password_repeat.message}
                    />
                </div>
                <small className="auth-form__form--global-error">{globalError}</small>
                <div className="auth-form__form--button">
                    <Button isLoading={isLoading && 'loading'} title="Login" type="btn-blue" />
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
