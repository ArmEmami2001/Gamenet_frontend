import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

const PrivateRoute = ({ children, role }) => {
    const { authTokens, userRole } = useAuth();
    
    if (!authTokens) {
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        const targetDashboard = userRole === 'employee' ? '/employee-dashboard' : '/customer-dashboard';
        return <Navigate to={targetDashboard} />;
    }

    return children;
};

export default PrivateRoute;