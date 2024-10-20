import { memo, useEffect } from "react";
import LeftHomePageNavbar from "../mainPageModules/leftSidePageNavbarComponents/leftHomePageNavbar";
import UpperRightHomePgeNavbar from "../mainPageModules/rigtSidePageComponents/upperRightNavbarComponents/upperRightHomePgeNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../redux/pagesSlice";
import { clearSelection, stopSelection } from "../redux/selectSlice";
import { updateShowExpo } from "../redux/showExpo";
import { editPayload } from "../redux/isEditable";
import Popover from "../mainPageModules/rigtSidePageComponents/desktopWithFilesModule/popover/Popover";
import ErrorBoundary from "../testingComp/ErrorBoundary";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSelecting } = useSelector((state) => state.select);
  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);

  useEffect(() => {
    console.log("sessionStorage.keys");
    dispatch(updatePages());
  }, [sessionStorage.key.length]);

  useEffect(() => {
    console.log("path");
    if (isSelecting) {
      dispatch(stopSelection());
      dispatch(updateShowExpo(false));
      dispatch(clearSelection());
    }
    if (isEditable) {
      dispatch(editPayload(false));
    }
  }, [location.pathname]);

  return (
    <div
      className="homePageNavbarConteiner"
      onClick={() => {
        if (isSelecting) {
          dispatch(stopSelection());
          dispatch(clearSelection());
          dispatch(updateShowExpo(false));
        }
        if (isEditable) {
          dispatch(editPayload(false));
        }
        if (showExpo) dispatch(updateShowExpo(false));
      }}
    >
      <LeftHomePageNavbar />
      <div className="rightHomePage">
        <UpperRightHomePgeNavbar />
        <div className="desktopWithFilesbgbg">
          <div
            className="scroll gfgdf"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundImage: localStorage.getItem("bg")
                ? `url(${localStorage.getItem("bg")})`
                : "none",
            }}
          >
            <div
              className="scroll"
              style={{
                background: localStorage.getItem("bg") && "none",
              }}
            >
              {showExpo && <Popover />}
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(HomePage);
