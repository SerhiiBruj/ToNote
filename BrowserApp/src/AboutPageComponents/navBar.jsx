import { Link, NavLink } from "react-router-dom";

const NavBarAbout = () => {
  return (
    <div id="AboutNav" className="navbar">
      <div className="navbar__left">
        <a href="https://github.com/SerhiiBruj/ToNote" className="navbar__logo">
          ToNote
        </a>

        <NavLink className="navbar__link" to={"WhatIsIt"}>
          What is it
        </NavLink>
        <NavLink className="navbar__link" to={"Technologies"}>
          Technologies
        </NavLink>
        <NavLink className="navbar__link" to={"Creator"}>
          Creator
        </NavLink>
      </div>

      <div className="navbar__right">
        <Link to={"/authentification"} className="navbar__auth-link">
          Log In
          <span className="navbar__separator"></span>
          Register
        </Link>
      </div>
    </div>
  );
};

export default NavBarAbout;
