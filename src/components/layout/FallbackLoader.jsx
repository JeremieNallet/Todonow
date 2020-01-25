import React from 'react';
//Services / assasts
import { Spinner } from '../../assets/svg/icons';

const FallbackLoader = () => {
    return (
        <div className="fallback-loader">
            <Spinner
                className="fallback-loader__spinner"
                classNamePath="fallback-loader__spinner-path "
            />
        </div>
    );
};

export default FallbackLoader;
