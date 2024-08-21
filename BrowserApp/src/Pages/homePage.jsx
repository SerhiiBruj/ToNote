import { useEffect } from "react";
import LeftHomePageNavbar from "../mainPageModules/leftSidePageNavbarComponents/leftHomePageNavbar";
import UpperRightHomePgeNavbar from "../mainPageModules/rigtSidePageComponents/upperRightNavbarComponents/upperRightHomePgeNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePages } from "../redux/pagesSlice";
import { clearSelection, stopSelection } from "../redux/selectSlice";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePages(Object.keys(localStorage)));
  }, [localStorage.key]);
  useEffect(() => {
    if (location.pathname.split("/")[1] !== "Home") {
      dispatch(stopSelection());
      dispatch(clearSelection());
    }
  }, [location.pathname]);

  return (
    <div className="homePageNavbarConteiner"  
    
    onClick={() => {
      dispatch(stopSelection());
      dispatch(clearSelection());
    }}>
      <LeftHomePageNavbar />
      <div className="rightHomePage">
        <UpperRightHomePgeNavbar />
        <div className="desktopWithFilesbgbg">
          <div className="scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
