import { memo, useCallback, useEffect, useState } from "react";
import LeftHomePageNavbar from "../mainPageModules/leftSidePageNavbarComponents/leftHomePageNavbar";
import UpperRightHomePgeNavbar from "../mainPageModules/rigtSidePageComponents/upperRightNavbarComponents/upperRightHomePgeNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../redux/pagesSlice";
import { clearSelection, stopSelection } from "../redux/selectSlice";
import { updateShowExpo } from "../redux/showExpo";
import { edit, editPayload } from "../redux/isEditable";
import Popover from "../mainPageModules/rigtSidePageComponents/desktopWithFilesModule/popover/Popover";
import ErrorBoundary from "../testingComp/ErrorBoundary";

const HomePage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isSelecting } = useSelector((state) => state.select);
  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);
  const [showMenu, setShowMenu] = useState(false);

  const setshowMenuMomorized = useCallback((state)=>setShowMenu(state),[])

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
      <LeftHomePageNavbar showMenu={showMenu} setShowMenu={setshowMenuMomorized} />
      <div className="rightHomePage">
        <UpperRightHomePgeNavbar setShowMenu={setshowMenuMomorized} />
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
              onTouchStart={() => {
                if (
                  ["checklist", "todo", "note", "table","diary"].includes(
                    location.pathname.split("/")[2]
                  )
                )
                  dispatch(edit());
              }}
              style={{
                background: localStorage.getItem("bg") && "none",
              }}
            >
              <ErrorBoundary>
                <Outlet />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      {showExpo && <Popover />}
    </div>
  );
};

export default memo(HomePage);
