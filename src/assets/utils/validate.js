export function validateTask(values) {
    let errors = {};

    const isEmpty = string => {
        if (string.trim() === '') return true;
        return false;
    };

    if (isEmpty(values.title)) errors.title = 'Field is required !';

    return errors;
}
