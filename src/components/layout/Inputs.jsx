import React from 'react';

//Services / assasts
import { Search, Spinner } from '../../assets/svg/icons';

export const Input = ({
    type,
    name,
    value,
    placeholder,
    onChange,
    label,
    error,
    errorClass,
    passwordClass,
    className,
    forwardRef
}) => {
    return (
        <div className="input">
            <input
                className={`input__field ${errorClass} ${passwordClass} ${className}`}
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                ref={forwardRef}
            />

            <label className="input__label">{label}</label>
            <small className="input__error">{error}</small>
        </div>
    );
};

export const SearchInput = ({ type, name, value, onChange, label, className }) => {
    return (
        <div className="search-input">
            <input
                onChange={onChange}
                type={type}
                name={name}
                value={value}
                className={`search-input__field ${className}`}
                placeholder={label}
            />

            <Search className="search-input__icon" />
        </div>
    );
};

export const RangeInput = ({ max, onChange, value, color, className }) => {
    return (
        <input
            type="range"
            className={`slider ${color} ${className}`}
            value={value}
            min="5"
            max={max}
            onChange={onChange}
        />
    );
};

export const Button = ({ title, type, onClick, isLoading, children, className }) => {
    return (
        <button
            onClick={onClick}
            className={`button ${type} ${isLoading} ${className}`}
            type="submit"
        >
            <span>{title}</span>
            <Spinner className="btn-spinner" classNamePath="btn-spinner__path" />
            {children}
        </button>
    );
};
