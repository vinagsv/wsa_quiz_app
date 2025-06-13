import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { loginAPI } from "../store/thunk/authThunk";
import { useAuthState } from "../hooks/useAuthState";

const validationSchema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().required("Password is required"),
});

function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isAuthenticated, loading } = useAuthState();

    useEffect(() => {
        // navigate to welcome page
        if (isAuthenticated) {
            navigate("/welcome");
        }
    }, [isAuthenticated]);

    const formik = useFormik({
        initialValues: {
            email:  "",
            password: "",
        },
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            dispatch(loginAPI(values));
        },
    });

    return (
        <div className="flex flex-1 justify-center items-center bg-base-100">
            <div className="card bg-base-200 w-full max-w-md shrink-0 shadow-2xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl">Login</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <fieldset className="fieldset flex flex-col gap-4">
                            <label className="label">Email</label>
                            <input
                                type="text"
                                className="input w-full"
                                placeholder="Email"
                                name={"email"}
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.dirty.email && formik.errors.email ? (
                                <div className="text-red-500 text-sm">{formik.errors.email}</div>
                            ) : null}

                            <label className="label">Password</label>
                            <input
                                type="password"
                                className="input w-full"
                                placeholder="Password"
                                name={"password"}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />

                            {formik.dirty.password && formik.errors.password ? (
                                <div className="text-red-500 text-sm">{formik.errors.password}</div>
                            ) : null}

                            <div>
                                <a className="link link-hover">Forgot password?</a>
                            </div>
                            <button type="submit" className="btn btn-primary rounded-lg mt-4">
                                {loading ? "Loading..." : "Login"}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
