import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    // const accessToken = useSelector(state => state.authStore.accessToken);
    // const userRole = useSelector(state => state.authStore.userRole);

    // if (!accessToken || userRole !== '') {
    //     console.log("Navigating to login ui.......");
    //     return <Navigate to="/login" replace />;
    // }
    return <Outlet />;
};

export default AdminRoute;
