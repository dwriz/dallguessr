import { Link } from "react-router-dom"

function LandingPage() {
  return (
    <>
    <h1>Landing Page</h1>
    <Link to="/login" className="btn btn-primary">Login</Link>
    <Link to="/register" className="btn btn-primary">Register</Link>
    </>
  )
}

export default LandingPage