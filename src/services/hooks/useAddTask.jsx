import { useState, useEffect } from 'react';

const useAddTask = (addTaskFunction, validateForm, setShowForm) => {
    const [values, setValues] = useState({
        title: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = async e => {
        e.preventDefault();
        setErrors(validateForm(values));
        setIsSubmitting(true);
    };

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting) {
            setShowForm(false);
            return async function() {
                await addTaskFunction(values);
            };
        }
    }, [addTaskFunction, errors, isSubmitting, setShowForm, values]);

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    };
};

export default useAddTask;
