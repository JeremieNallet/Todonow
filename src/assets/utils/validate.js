export function validateSignup(values) {
    let errors = {};

    const isEmpty = string => {
        if (string.trim() === '') return true;
        return false;
    };
    // eslint-disable-next-line no-useless-escape
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (isEmpty(values.email)) {
        errors.email = 'Email is required';
    } else if (!values.email.match(emailRegEx)) {
        errors.email = 'Email address is invalid';
    }

    if (isEmpty(values.password)) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password is too weak';
    }
    if (values.password !== values.confirmPassword)
        errors.confirmPassword = 'Passwords must match';

    return errors;
}

export function validateTask(values) {
    let errors = {};

    const isEmpty = string => {
        if (string.trim() === '') return true;
        return false;
    };

    if (isEmpty(values.title)) errors.title = 'Field is required !';

    return errors;
}

export function validateSignIn(values) {
    let errors = {};

    const isEmpty = string => {
        if (string.trim() === '') return true;
        return false;
    };

    if (isEmpty(values.email)) errors.email = 'Email is required';
    if (isEmpty(values.password)) errors.password = 'Password is required';

    return errors;
}

export function validateRecover(values) {
    let errors = {};

    const isEmpty = string => {
        if (string.trim() === '') return true;
        return false;
    };
    if (isEmpty(values.email)) errors.email = 'Email is required';

    return errors;
}
