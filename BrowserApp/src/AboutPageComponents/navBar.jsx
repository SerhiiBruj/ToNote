import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NavBarAbout = () => {

  const location = useLocation();
  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView();
    }
  };

  useEffect(()=>{
    handleScroll(location.pathname.split('/')[-1])
  },[location.pathname])

  return (
    <div id="AboutNav" className="navbar">
      <div className="navbar__left">
        <a
          href="https://github.com/SerhiiBruj/ToNote"
          className="navbar__logo"
        >
          ToNote
        </a>

        <span
          onClick={() => {
            handleScroll("WhatIsIt");
            window.history.pushState(
              {},
              "",
              `${window.location.hash.replace(
                /\/Technologies|\/Creator|\/WhatIsIt/g,
                ""
              )}/WhatIsIt`
            );
          }}
          className="navbar__link"
        >
          What is it
        </span>
        <span
          onClick={() => {
            handleScroll("Technologies");
            window.history.pushState(
              {},
              "",
              `${window.location.hash.replace(
                /\/Technologies|\/Creator|\/WhatIsIt/g,
                ""
              )}/Technologies`
            );
          }}
          className="navbar__link"
        >
          Technologies
        </span>
        <span
          onClick={() => {
            handleScroll("Creator");
            window.history.pushState(
              {},
              "",
              `${window.location.hash.replace(
                /\/Technologies|\/Creator|\/WhatIsIt/g,
                ""
              )}/Creator`
            );
          }}
          className="navbar__link"
        >
          Creator
        </span>
        </div>
      <div className="navbar__right">
        <Link to={"/authentification"} className="navbar__auth-link" >
          Log In
          <span className="navbar__separator"></span>
          Register
        </Link>
      </div>
    </div>
  );
};

export default NavBarAbout;
