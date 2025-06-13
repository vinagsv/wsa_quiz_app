import { Link } from "react-router-dom";
import { useAuthState } from "../hooks/useAuthState";

function Navbar() {
    const { isAuthenticated } = useAuthState();
    return (
        <div className="navbar bg-base-200/80 shadow-sm flex-none">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">Quiz</a>
            </div>
            {!isAuthenticated ? (
                <div className="flex-none flex gap-3">
                    <Link to="/login" className="btn btn-primary rounded-lg">
                        Login
                    </Link>
                    <Link to="/register" className="btn btn-primary rounded-lg">
                        Register
                    </Link>
                </div>
            ) : (
                <div className="flex-none flex gap-3">
                    <Link to={"/logout"} className="btn btn-primary  hover:btn-error rounded-lg">
                        logout
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Navbar;
