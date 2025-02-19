import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedLevel = ({ level }) => {

    const lvl = localStorage.getItem('level')
    let parameter = 0;
        if(level.some(itemx=>itemx==lvl )){
            parameter = parameter + 1;
        }
    
    
    if (parameter > 0) {
        return <Outlet />
    }
    else { <Navigate to={'/pos'} replace /> }

    return <Navigate to={'/pos'} replace />;
}
    

