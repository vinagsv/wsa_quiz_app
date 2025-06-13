import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter } from 'react-router-dom'
// import HomePage from './pages/HomePage.jsx'
// import RegisterPage from './pages/RegisterPage.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import QuestionPage from './pages/QuestionPage.jsx'
// import WelcomePage from './pages/WelcomePage.jsx'
// import ResultPage from './pages/ResultPage.jsx'
import { Provider } from 'react-redux'
import store from './store'

// const paths = {
//     home: '/',
//     register: '/register',
//     login: '/login',
//     protectedRoute: {
//         welcome: '/welcome',
//         question: '/question',
//         result: '/result',
//     }
// }

// export const router = createBrowserRouter([
//     {
//         path: paths.home,
//         element: <HomePage />,
//     },
//     {
//         path: paths.register,
//         element: <RegisterPage />,
//     },
//     {
//         path: paths.login,
//         element: <LoginPage />,
//     },
//     {
//         path: paths.protectedRoute.welcome,
//         element: <WelcomePage />,
//     },
//     {
//         path: paths.protectedRoute.question,
//         element: <QuestionPage />,
//     },
//     {
//         path: paths.protectedRoute.result,
//         element: <ResultPage />,
//     },
// ])


createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
)
