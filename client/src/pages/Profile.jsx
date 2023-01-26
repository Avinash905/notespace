import React, { useState } from "react";
import Button from "../components/Button";
import Heading from "../components/Heading";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { updateProfile } from "../helper/apiCall";
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import convertToBase64 from "../helper/convertImage";

function Profile() {
  const { userinfo } = useContext(UserContext);
  const [userDetails, setUserDetails] = useState({
    username: userinfo.username || "",
    email: userinfo.userEmail || "",
    password: "",
    confPass: "",
    profile: userinfo.profile || "",
  });
  const navigate = useNavigate();

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setUserDetails({ ...userDetails, profile: base64 });
  };

  const updateHandle = async (e) => {
    e.preventDefault();
    const { username, email, password, confPass, profile } = userDetails;
    if (password !== confPass) {
      return toast.error("Passwords do not match");
    }

    const data = await toast.promise(
      updateProfile({ username, email, password, profile }),
      {
        pending: "Updating profile...",
        success: "Profile updated successfully",
        error: "Unable to update profile",
        loading: "Updating profile...",
      }
    );
  };

  return (
    <>
      <section className="login-section profile-section">
        <div className="login-container profile-container">
          <Heading text={"edit profile"} />
          <form onSubmit={updateHandle}>
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
            <Button text={"update"} />
          </form>
        </div>
        <div className="profile-pic-cont ">
          <img
            src={
              userDetails.profile ||
              "https://img.icons8.com/fluency/512/name.png"
            }
            alt="profile-pic"
          />
        </div>
      </section>
    </>
  );
}

export default Profile;
