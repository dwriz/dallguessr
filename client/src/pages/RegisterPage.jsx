import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  }

  async function handleRegister(input) {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3000/register",
        data: input,
      });
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitRegister(event) {
    event.preventDefault();
    handleRegister(input);
  }

  return (
    <>
      <div
        className="container bg-white text-center p-5"
        style={{ width: "1000px" }}
      >
        <h1>Register Page</h1>
        <form autoComplete="off" onSubmit={submitRegister}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={handleChangeInput}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            onChange={handleChangeInput}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={handleChangeInput}
          />

          <button
            type="submit"
            className="btn"
            style={{ backgroundColor: "black", color: "green" }}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
