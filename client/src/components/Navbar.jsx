import React from "react";
import "../styles/navbar.css";
import { NavLink } from "react-router-dom";

function Navbar() {
  const logoutHandle = () => {
    localStorage.removeItem("token");
  };

  return (
    <nav>
      <div className="navbar container ">
        <h3 className="nav-name">NoteSpace</h3>
        <div className="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
        </div>
        <div className="nav-menu d-flex align-items-center">
          <ul className="my-auto d-flex gap-4">
            <li>
              <NavLink to={"/allnotes"}>My Notes</NavLink>
            </li>
            <li className="nav-item dropdown ">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Bagma
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink className="dropdown-item" to={"/profile"}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={"/"}
                    onClick={logoutHandle}
                  >
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
