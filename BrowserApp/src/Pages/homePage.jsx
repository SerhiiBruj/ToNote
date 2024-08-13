import React, { useEffect, useRef } from "react";
import LeftHomePageNavbar from "../mainPageModules/leftSidePageNavbarComponents/leftHomePageNavbar";
import UpperRightHomePgeNavbar from "../mainPageModules/rigtSidePageComponents/upperRightNavbarComponents/upperRightHomePgeNavbar";
import DesktopWithFiles from "../mainPageModules/rigtSidePageComponents/desktopWithFilesModule/desktopWithFiles";
import { Outlet } from "react-router-dom";

const HomePage = () => {
  const ref = useRef(null);

  const updateHeight = () => {
    if (ref.current) {
      ref.current.style.height = `${window.innerHeight}px`;
    }
  };

  useEffect(() => {
    document.title = "Home Page";
    updateHeight();

    window.addEventListener("resize", updateHeight);
    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div ref={ref} className="homePageNavbarConteiner">
      <LeftHomePageNavbar />
      <div className="rightHomePage">
        <UpperRightHomePgeNavbar />
        <div className="desktopWithFilesbgbg">
          <div
            className="scroll"
            style={{
              width: "100%",
              borderTopLeftRadius: 50,
              backgroundColor: "#1e1e1e",
              overflow: "auto",
              height: "100%",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
