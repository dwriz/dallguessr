import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  function handleChangeInput(event) {
    const { name, value } = event.target;

    setInput({ ...input, [name]: value });
  }

  async function handleLogin(input) {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/login",
        data: input,
      });

      localStorage.setItem("token", data.token);

      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  }

  async function submitLogin(event) {
    event.preventDefault();

    handleLogin(input);
  }

  async function handleCredentialResponse(response) {
    try {
      const { data } = await axios({
        method: "post",
        url: "http://localhost:3000/google-login",
        headers: {
          google_token: response.credential,
        },
      });

      localStorage.setItem("token", data.token);

      navigate(`/dashboard`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    window.onload = function () {
      google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }
      );

      google.accounts.id.prompt();
    };
  }, []);

  return (
    <>
      <h1>Login Page</h1>
      <form autoComplete="off" onSubmit={submitLogin}>
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

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        {/* <button>Ini google login</button> */}
        <div id="buttonDiv"></div>
      </form>
    </>
  );
}

export default LoginPage;
