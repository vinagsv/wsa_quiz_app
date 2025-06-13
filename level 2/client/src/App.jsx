import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import QuestionScreen from "./pages/QuestionScreen";
import ResultScreen from "./pages/ResultScreen";
import WelcomeScreen from "./pages/WelcomeScreen";
import Logout from "./pages/Logout";
import Footer from "./components/Footer";
import ProtectedRoute from "./pages/ProtectedRoute";

export const routes = {
  home: "/",
  login: "/login",
  signup: "/signup",
  protectedRoutes: {
    welcome: "/welcome",
    questions: "/questions",
    result: "/result",
    logout: "/logout",
  },
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: routes.home,
      element: <Home />,
    },
    {
      path: routes.login,
      element: <Login />,
    },
    {
      path: routes.signup,
      element: <Signup />,
    },
    {
      path: routes.protectedRoutes.welcome,
      element: <ProtectedRoute element={<WelcomeScreen />} />,
    },
    {
      path: routes.protectedRoutes.questions,
      element: <ProtectedRoute element={<QuestionScreen />} />,
    },
    {
      path: routes.protectedRoutes.result,
      element: <ProtectedRoute element={<ResultScreen />} />,
    },
    {
      path: routes.protectedRoutes.logout,
      element: <ProtectedRoute element={<Logout />} />,
    },
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <RouterProvider router={router} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
