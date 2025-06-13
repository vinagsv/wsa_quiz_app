import { Navigate, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useAuthState } from "./hooks/useAuthState";
import {
    HomePage,
    LoginPage,
    QuestionPage,
    RegisterPage,
    ResultPage,
    WelcomePage,
    LogoutPage,
} from "./pages";

function App() {
    const { isAuthenticated } = useAuthState();
    return (
        <div className="h-screen flex flex-col">
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/welcome"
                    element={isAuthenticated ? <WelcomePage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/question"
                    element={isAuthenticated ? <QuestionPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/result"
                    element={isAuthenticated ? <ResultPage /> : <Navigate to="/login" />}
                />
                <Route path="/logout" element={<LogoutPage />} />
            </Routes>
            <Footer />
            <Toaster />
        </div>
    );
}

export default App;
