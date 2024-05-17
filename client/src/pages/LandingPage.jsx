import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div
        className="container bg-white text-center p-5"
        style={{ width: "1000px" }}
      >
        <h1>dallguessr</h1>
        <p>Stop Skynet from destroying the world by guessing a DALL-E-generated image</p>
        <Link
          to="/login"
          className="btn"
          style={{ backgroundColor: "black", color: "green" }}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="btn"
          style={{ backgroundColor: "black", color: "green" }}
        >
          Register
        </Link>
      </div>
    </>
  );
}

export default LandingPage;
