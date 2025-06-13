import { Link } from "react-router-dom"
import { useState } from "react"
function RegisterPage() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = () => {
    // Handle registration logic here
  }

  return (
    <div className="flex flex-col flex-1 gap-5 justify-center items-center bg-base-100">
      <div className="flex flex-col gap-10 text-center p-5 mb-10">
        <h2 className="text-5xl font-extrabold">Register</h2>
        <p>
          Register now!
          Welcome aboard! Sign up now to start your quiz adventure and boost your knowledge!
        </p>
      </div>
      <div className="card bg-base-200 w-full max-w-md shrink-0 shadow-2xl">
        <div className="card-body">
          <fieldset className="fieldset flex flex-col gap-4">

            <label className="label">Name</label>
            <input type="text" className="input w-full" placeholder="Name" />

            <label className="label">Email</label>
            <input type="email" className="input w-full" placeholder="Email" />

            <label className="label">Password</label>
            <input type="password" className="input w-full" placeholder="Password" />

            <label className="label">Confirm Password</label>
            <input type="password" className="input w-full" placeholder="Password" />

            <div><Link to="/login" className="link link-hover">Already have an account? Login</Link></div>
            <button className="btn btn-primary rounded-lg mt-4">Resgister</button>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage