import { useEffect } from "react";
import LeftHomePageNavbar from "../mainPageModules/leftSidePageNavbarComponents/leftHomePageNavbar";
import UpperRightHomePgeNavbar from "../mainPageModules/rigtSidePageComponents/upperRightNavbarComponents/upperRightHomePgeNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../redux/pagesSlice";
import { clearSelection, stopSelection } from "../redux/selectSlice";
import { editPayload } from "../redux/isEditable";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const {isSelecting}=useSelector(state=>state.select)
  const isEditable=useSelector(state=>state.isEditable.value)

  useEffect(() => {
    dispatch(updatePages(Object.keys(localStorage)));
  }, [localStorage.key]);
  useEffect(() => {
    if (location.pathname.split("/")[1] !== "Home") {
      dispatch(stopSelection());
      dispatch(clearSelection());
      dispatch(editPayload(false));
    }
  }, [location.pathname]);
 

  return (
    <div className="homePageNavbarConteiner"  
    
    onClick={() => {
      if(isSelecting){
      dispatch(stopSelection());
      dispatch(clearSelection());
    }
    if(isEditable){
      dispatch(editPayload(false))
    }
    
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
