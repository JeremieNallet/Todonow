import React from 'react';

// Services / assets
import { LandingImg } from '../assets/svg/Images';

//  Components
import AuthLayout from '../components/layout/AuthLayout';
import AuthLanding from '../components/auth/AuthLanding';

const PreAuth = () => (
    <AuthLayout>
        <LandingImg />
        <AuthLanding />
    </AuthLayout>
);

export default PreAuth;
