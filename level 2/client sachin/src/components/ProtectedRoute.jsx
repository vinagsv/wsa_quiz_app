import clsx from 'clsx';
import React from 'react'
import { useLocation } from 'react-router-dom';

const isAuthenticated = true;

function ProtectedRoute({ element }) {
    const location = useLocation();

    return isAuthenticated ? (
        <>
            <button className={clsx("btn btn-primary", location.pathname === "/question" && "hidden")}></button>
        </>

    ) : (<button></button>);


}


export default ProtectedRoute