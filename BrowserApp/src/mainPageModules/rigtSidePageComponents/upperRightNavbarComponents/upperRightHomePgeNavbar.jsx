import { useEffect, useState } from "react";
import LogoIcon from "../../../assetModules/svgs/logo";
import ShareIcon from "../../../assetModules/svgs/share";
import BinIcon from "../../../assetModules/svgs/bin";
import PenIcon from "../../../assetModules/svgs/pen";
import { useDispatch, useSelector } from "react-redux";
import isEditable, { edit } from "../../../redux/isEditable";
import BackLeafIcon from "../../../assetModules/svgs/backLeaf";
import {  useLocation } from "react-router-dom";
import StartSelection from "../../../assetModules/noSvg/startSelections";
import { updatePages } from "../../../redux/pagesSlice";
import {
  clearSelection,
  startSelection,
  stopSelection,
} from "../../../redux/selectSlice";

import { updateShowExpo } from "../../../redux/showExpo";
import { updateisTable } from "../../../redux/istable";
let listOfFileTypes = ["dashboard", "note", "checklist", "todo", "table"];

const UpperRightHomePgeNavbar = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const [page, setPage] = useState("");
  const showSomething = useSelector((state) => state.showExpo.value);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    if (location.pathname.split("/")[3]) {
      setIsHome(false);
      setPage(location.pathname.split("/")[3]);
    } else {
      setPage(location.pathname.split("/")[1]);
      setIsHome(true);
    }
  }, [location.pathname]);

  const deleteFile = () => {
    if (isSelecting) {
      if (selected.length > 0) {
        for (let file of selected) {
          localStorage.removeItem(file);
        }
        dispatch(updatePages());
        dispatch(stopSelection());
        dispatch(clearSelection());
      } else {
        dispatch(stopSelection());
        dispatch(clearSelection());
      }
    } else {
      dispatch(startSelection());
    }
  };
  const exportFile = () => {
    if (isHome) {
      if (isSelecting) {
        if (selected.length > 0) {
          if (showSomething) {
            dispatch(updateShowExpo(false));
            dispatch(clearSelection());
            dispatch(stopSelection());
          } else {
            dispatch(updateShowExpo(true));
          }
        } else {
          dispatch(updateShowExpo(false));
          dispatch(stopSelection());
        }
      } else {
        dispatch(startSelection());
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      if (!showSomething) dispatch(updateShowExpo(true));
      else dispatch(updateShowExpo(false));
    }
  };
  return (
    <div className="upperRightHomePageNavbar">
      <div
        style={{
          transition: "all ease 0.5s",
          opacity: !isHome ? "1" : "0",
          transform: !isHome ? "scale(1)" : "scale(0)",
        }}
     
      >
        <BackLeafIcon size={0.8} color={"#2e2e2e"} />
      </div>

      <div>
        <h1 className="Name">
          {decodeURIComponent(page.replace(/(%20|_)/g, " "))}
        </h1>
      </div>

      <div className="upperRightRightsectionHomePageNavbar">
        {location.pathname.split("/")[2] === "dashboard" && (
          <div>
            <button
              style={{
                outline: "none",
                border: "none",
                background: "darkgray",
                borderRadius: 15,
                padding: 10,
              }}
              onClick={() => dispatch(updateisTable())}
            >
              Table
            </button>

            {/* <NavLink
              to={
                location.pathname.split("/")[2] === "dashboard"
                  ? `dashboardTable/${location.pathname.split("/")[3]}`
                  : `dashboard/${location.pathname.split("/")[3]}`
              }
            >
              table
            </NavLink> */}
          </div>
        )}

        <div
          style={{
            transition: "all ease 0.2s",
            transform: isHome ? "none" : "scale(0)",
            opacity: isHome ? 1 : 0,
          }}
        >
          <StartSelection />
        </div>
        <div
          className="peni "
          onClick={() => {
            dispatch(edit());
            if (isSelecting) {
              dispatch(stopSelection());
              dispatch(clearSelection());
            }
          }}
        >
          <PenIcon size={0.9} color="#2e2e2e" roll={isEditable} />
        </div>
        <div onClick={deleteFile}>
          <BinIcon size={1} color="#2e2e2e" />
        </div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            exportFile();
          }}
        >
          <ShareIcon size={1} color={"#2e2e2e"} />
        </div>
        <div style={{ marginTop: "4%" }}>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default UpperRightHomePgeNavbar;
