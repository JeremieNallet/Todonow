import React from 'react';
import PropTypes from 'prop-types';

// Components
import { Button, Input } from '../layout/Inputs';

// Store
import { recoverPassword, cleanUp } from '../../store/actions/authActions';
import { connect } from 'react-redux';

// Services / assests
import useForm from '../../services/hooks/useForm';
import { validateRecover } from '../../assets/utils/validate';

const RecoverForm = ({
    onClick,
    recoverPassword,
    globalError,
    isLoading,
    emailSent,
    cleanUp
}) => {
    const { handleChange, handleSubmit, values, errors } = useForm(
        recoverPassword,
        validateRecover,
        cleanUp
    );
    const formatError = globalError => {
        if (globalError) return 'User email not found';
    };
    return (
        <div className="auth-form">
            <form noValidate onSubmit={handleSubmit} className="auth-form__form auth-recover">
                <div className="auth-form__form--title">
                    <h3>Recover your password</h3>
                </div>
                <div className="auth-form__form--fields">
                    <Input
                        error={errors.email || formatError(globalError)}
                        onChange={handleChange}
                        type="email"
                        name="email"
                        label={!values.email && 'Your email ...'}
                        value={values.email}
                        errorClass={errors.email && 'error-style'}
                    />
                </div>
                <div className="auth-form__form--button">
                    <Button
                        title="Send a recovery email"
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
