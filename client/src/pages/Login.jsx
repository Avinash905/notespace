import React, { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../helper/apiCall";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const loginHandle = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    } else if (!password) {
      return toast.error("Password is required");
    }

    const { msg, token, username, userEmail, profile } = await toast.promise(
      login({
        email,
        password,
      }),
      {
        pending: "Logging in...",
        success: "Login successful",
        error: "Invalid credentials",
      }
    );

    setUserInfo({ username, userEmail, profile });
    localStorage.setItem("token", token);
    return navigate("/allnotes");
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <Heading text={"login"} />
        <form onSubmit={loginHandle}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button text={"login"} />
        </form>
        <p className="already-account">
          Don't have an account ?<NavLink to={"/register"}> Register</NavLink>
        </p>
      </div>
    </section>
  );
}

export default Login;
