import React, { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../helper/apiCall";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import Loading from "../components/Loading";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setUserInfo, isLoading, setLoading } = useContext(UserContext);

  const loginHandle = async (e) => {
    e.preventDefault();
    if (!email) {
      return toast.error("Email is required");
    } else if (!password) {
      return toast.error("Password is required");
    }
    setLoading(true);
    const { msg, token, username, userEmail, profile } = await login({
      email,
      password,
    });
    setLoading(false);
    if (!msg) {
      return toast.error("Invalid credentials");
    }
    setUserInfo({ username, userEmail, profile });
    toast.success(msg);
    localStorage.setItem("token", token);
    return navigate("/allnotes");
  };

  return (
    <section className="login-section">
      <div className="login-container">
        {isLoading && <Loading />}
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
