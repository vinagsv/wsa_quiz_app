import React, { useEffect, useState } from "react";
import { useAuthState } from "../hooks/useAuthState";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAPI } from "../store/thunk/authThunk";

function LogoutPage() {
    const { isAuthenticated } = useAuthState();
    const [redirect, setRedirect] = useState(5);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            dispatch(logoutAPI(false));
        }
        const id = setTimeout(() => {
            navigate("/", { replace: true });
        }, 5000);

        return () => clearTimeout(id);
    }, [isAuthenticated]);

    useEffect(() => {
        const id = setTimeout(() => {
            setRedirect(redirect - 1);
        }, 1000);
        return () => clearTimeout(id);
    }, [redirect]);

    return (
        <div className="flex  flex-1 flex-col gap-5 justify-center items-center">
            <p className="text-2xl font-bold text-center text-error">You have been logged out</p>
            <p className="text-lg">You will be redirected in {redirect} seconds</p>
            <p className="text-lg">Redirecting to Home page</p>
        </div>
    );
}

export default LogoutPage;
