import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../components/Button";

function Error() {
  return (
    <div className="flex-center flex-column login-section">
      <h2 className="fs-1 my-5">Error! Page not found</h2>
      <NavLink to={"/"}>
        <Button text={"Home"} />
      </NavLink>
    </div>
  );
}

export default Error;
