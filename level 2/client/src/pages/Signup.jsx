import React, { useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { signupAPI } from "../store/thunks/authThunks";
import Navbar from "../components/Navbar";
import { routes } from "../App";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const validationSchema = useMemo(
    () =>
      Yup.object({
        username: Yup.string().trim().required("Name is required"),
        email: Yup.string()
          .trim()
          .email("Invalid email")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(signupAPI(values)).then((result) => {
        if (result.meta.requestStatus === "fulfilled") {
          navigate(routes.protectedRoutes.welcome);
        }
      });
    },
  });

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      <Navbar navigateButton="Login" />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="card w-full max-w-md bg-base-100 shadow">
          <form onSubmit={formik.handleSubmit} className="card-body">
            <h2 className="card-title justify-center">Sign Up</h2>
            <div className="space-y-3">
              <div>
                <label className="label" htmlFor="username">
                  Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Full Name"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.username}
                />
                {formik.touched.username && formik.errors.username && (
                  <p className="text-error text-sm mt-1">
                    {formik.errors.username}
                  </p>
                )}
              </div>
              <div>
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
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
                  placeholder="Password"
                  className="input input-bordered w-full"
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
              <div>
                <label className="label" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="input input-bordered w-full"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <p className="text-error text-sm mt-1">
                      {formik.errors.confirmPassword}
                    </p>
                  )}
              </div>
              {error && <p className="text-error text-sm">{error}</p>}
              <p className="text-sm mt-2">
                Already have an account?{" "}
                <Link to={routes.login} className="link link-primary">
                  Login
                </Link>
              </p>
              <button
                type="submit"
                className="btn btn-neutral mt-4"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Signup;
