import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProtectedLevel = ({ level }) => {

    const lvl = localStorage.getItem('level')
    let parameter = 0;
        if(level.some(itemx=>itemx==lvl )){
            parameter = parameter + 1;
        }
    
    
    if (parameter > 0) {
        return <Outlet />
    }
    else {
        toast.error("Akses ditolak"),
        <Navigate to={'/pos'} replace />
    }

    return <Navigate to={'/pos'} replace />;
}
    

