import { useEffect } from "react";
import { Link, Navigate } from "react-router-dom"

function WelcomePage() {
  const isAuthenticated = true;
  useEffect(() => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
  }, [isAuthenticated]);
  return (
    <div className="flex flex-1">
      <div className="card bg-base-200 w-1/2 p-5  m-auto">
        <div className="card-body text-center">

          <h2 className="text-3xl font-extrabold">Let's Start🚀</h2>

          <div className="text-left text-xl m-5">
            <p>Are you Ready?</p>
            <p>Let's see how many questions you can answer</p>
          </div>

          <ul className="mt-6 flex flex-col gap-5 text-lg text-left text-base-content/50">
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>There are 30 Questions</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              <span>You need to pick 1 answer</span>
            </li>
          </ul>

          <div className="mt-6">
            <Link to={"/question"}>
              <button className="btn btn-primary btn-wide">Start the Quiz</button>
            </Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default WelcomePage