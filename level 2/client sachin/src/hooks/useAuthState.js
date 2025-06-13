import { useSelector } from "react-redux";

export const useAuthState = () => {
    const isAuthenticated = useSelector((state) => state.auth);
    return isAuthenticated;
};
