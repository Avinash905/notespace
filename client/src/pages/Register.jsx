import React, { useContext, useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register } from "../helper/apiCall";
import convertToBase64 from "../helper/convertImage";

function Register() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    confPass: "",
    profile: "",
  });
  const navigate = useNavigate();

  const inputHandle = async (e) => {
    const { name, value } = e.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUserDetails({ ...userDetails, profile: base64 });
  };

  const registerHandle = async (e) => {
    e.preventDefault();
    const { username, email, password, confPass, profile } = userDetails;

    if (!username || !email || !password || !confPass) {
      return toast.error("Input field is required");
    } else if (password !== confPass) {
      return toast.error("Passwords do not match");
    }
    const data = await toast.promise(
      register({ username, email, password, profile }),
      {
        pending: "Registering user...",
        success: "User registered successfully",
        error: "Unable to register user",
        loading: "Registering user...",
      }
    );
    return navigate("/login");
  };

  return (
    <section className="login-section">
      <div className="login-container">
        <Heading text={"register"} />
        <form onSubmit={registerHandle}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleFormControlInput1"
              placeholder="Enter username"
              name="username"
              value={userDetails.username}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleFormControlInput2"
              placeholder="name@example.com"
              name="email"
              value={userDetails.email}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput3" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput3"
              placeholder="Enter password"
              name="password"
              value={userDetails.password}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput4" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleFormControlInput4"
              placeholder="Confirm password"
              name="confPass"
              value={userDetails.confPass}
              onChange={inputHandle}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput5" className="form-label">
              Profile Picture
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleFormControlInput5"
              name="profile"
              onChange={onUpload}
            />
          </div>
          <Button text={"register"} />
        </form>
        <p className="already-account">
          Have an account ?<NavLink to={"/login"}> Login</NavLink>
        </p>
      </div>
    </section>
  );
}

export default Register;
