import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoutes = () => {
    const token = localStorage.getItem("token");

    if (!token) return <Navigate to="../" replace />;

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token"); // Remove expired token
            return <Navigate to="../" replace />;
        }
    } catch (error) {
        return <Navigate to="../" replace />;
    }

    return <Outlet />;
}
