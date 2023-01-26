import React from "react";
import Button from "../components/Button";
import "../styles/welcome.css";
import { NavLink } from "react-router-dom";

function Welcome() {
  return (
    <section className="welcome-section">
      <div className="welcome-cont flex-center flex-column">
        <h1 className="welcome-heading">Welcome to NoteSpace</h1>
        <p className="welcome-text">Notes on the air.</p>
        <div className="welcome-btn-cont">
          <NavLink to={"/register"}>
            <Button text={"signup"} />
          </NavLink>
          <NavLink to={"/login"}>
            <Button text={"login"} />
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Welcome;
