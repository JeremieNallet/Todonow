import { useState, useEffect } from 'react';

const useSignup = (authAction, validateForm, cleanUp) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        cleanUp();
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        if (Object.keys(errors).length !== 0) {
            setErrors({});
            setIsSubmitting(false);
        }
    };

    const handleSubmit = e => {
        e.preventDefault();
        setErrors(validateForm(values));

        setIsSubmitting(true);
    };

    useEffect(() => {
        cleanUp();
        if (Object.keys(errors).length === 0 && isSubmitting) {
            authAction(values);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors, cleanUp]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useSignup;
