import { Link } from 'react-router-dom'
import { useAuthState } from "../hooks/useAuthState"

function HomePage() {
    const isAuthenticated = useAuthState();
    
    return (
        <div className="hero bg-base-200 flex flex-1">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="text-5xl font-bold">Hello candidates!</h1>
                    {/* // quiz application */}
                    <p className="py-6">
                        Welcome to our quiz app! Get ready to test your knowledge, challenge yourself, and have fun. Let's begin your journey of learning and excitement-good luck and enjoy!
                    </p>
                    <Link to="/welcome" className="btn btn-primary btn-wide rounded-lg">Get Started</Link>
                </div>
            </div>
        </div>
    )
}

export default HomePage