import React from 'react';

const AuthLayout = ({ children }) => {
    return (
        <div className="auth-layout">
            <div className="mb-6 text-lg font-semibold">
                This is the Auth Layout
            </div>
            {children}
        </div>
    );
};

export default AuthLayout;