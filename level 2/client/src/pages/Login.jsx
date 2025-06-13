import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginAPI } from "../store/thunks/authThunks";
import Navbar from "../components/Navbar";
import { routes } from "../App";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const validationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .trim()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string().required("Password is required"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: (values) => {
      dispatch(loginAPI(values)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate(routes.protectedRoutes.welcome);
        }
      });
    },
  });

  return (
    <div className="flex flex-col h-screen">
      <Navbar navigateButton="Signup" />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow">
          <form onSubmit={formik.handleSubmit} className="card-body">
            <h2 className="card-title justify-center">Login Now!</h2>
            <p className="text-center text-base-content/60 mb-4">
              Welcome back! Enter your credentials.
            </p>
            <fieldset className="space-y-3">
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input input-bordered w-full"
                  placeholder="Email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-error text-sm mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div>
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input input-bordered w-full"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-error text-sm mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>
              <div className="text-right">
                <a href="#" className="link link-hover text-sm">
                  Forgot password?
                </a>
              </div>
              {error && <p className="text-error text-sm">{error}</p>}
              <button
                type="submit"
                className="btn btn-neutral w-full mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <p className="text-sm text-center mt-2">
                Don't have an account?{" "}
                <Link to={routes.signup} className="link link-primary">
                  Sign up
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Login;
