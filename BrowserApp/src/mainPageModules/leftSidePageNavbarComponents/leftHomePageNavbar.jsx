import {  useEffect, useRef } from "react";
import Profile from "./profile";
import Arrow from "../../assetModules/svgs/arrow";
import Scrollpanel from "./Scrollpanel";
import { useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const LeftHomePageNavbar = ({ setShowMenu }) => {
  const location = useLocation()
  const ref = useRef(null);
  

  useEffect(() => {
      setShowMenu(false)
  }, [location.pathname]);

  return (
    <div

      style={{
        background: "#1e1e1e",
        transform: window.innerWidth < 500 && showMenu && "translateX(0vw)",
        transition: "all ease 0.5s",
        width: window.innerWidth < 500 && showMenu && "100vw",
        paddingTop: 0,
        zIndex: 5,
      }}
      ref={ref}
      className="leftHomePageNavbar"
    >
      <div
        style={{
          width: "100%",
          paddingLeft: 50,
          position: "absolute",
          display: window.innerWidth < 500 && showMenu ?"flex" :"none",
        }}
        
        onClick={() => {
          if (ref.current) {
            ref.current.style.transform = "translateX(-100vw)";
            setShowMenu(false);
          }
        }}
      >
        <Arrow size={40}  />
      </div>
      <Profile />
      <Scrollpanel setShowMenu={setShowMenu} />
    </div>
  );
};

export default LeftHomePageNavbar;
