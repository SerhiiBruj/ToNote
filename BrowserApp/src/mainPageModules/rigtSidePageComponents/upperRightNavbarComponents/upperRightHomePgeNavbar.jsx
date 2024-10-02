import { useCallback, useEffect, useState, useMemo, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import LogoIcon from "../../../assetModules/svgs/logo";
import ShareIcon from "../../../assetModules/svgs/share";
import BinIcon from "../../../assetModules/svgs/bin";
import PenIcon from "../../../assetModules/svgs/pen";
import BackLeafIcon from "../../../assetModules/svgs/backLeaf";
import StartSelection from "../../../assetModules/noSvg/startSelections";

import { edit } from "../../../redux/isEditable";
import { updatePages } from "../../../redux/pagesSlice";
import {
  clearSelection,
  startSelection,
  stopSelection,
} from "../../../redux/selectSlice";
import { updateShowExpo } from "../../../redux/showExpo";

const listOfFileTypes = ["dashboard", "note", "checklist", "todo", "table"];

const UpperRightHomePgeNavbar = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const showSomething = useSelector((state) => state.showExpo.value);
  const isEditable = useSelector((state) => state.isEditable.value);

  const [page, setPage] = useState("");
  const [isHome, setIsHome] = useState(true);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  // Memoized `page` and `isHome` calculation for optimization
  useEffect(() => {
    const paths = location.pathname.split("/");
    const pagePath = paths[3] ? paths[3] : paths[1];
    setPage(pagePath);
    setIsHome(!paths[3]);
  }, [location.pathname]);

  const sendToServerToDelete = useCallback(
    async (selectedFiles) => {
      try {
        const response = await axios.post(
          "http://localhost:3000/delete-uploaded-file",
          { filesToDelete: selectedFiles },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    },
    [selected]
  );

  const deleteFile = useCallback(() => {
    if (isHome) {
      if (isSelecting && selected.length > 0) {
        sendToServerToDelete(selected);
        selected.forEach((file) => sessionStorage.removeItem(file));
        dispatch(updatePages());
        dispatch(stopSelection());
        dispatch(clearSelection());
      } else {
        dispatch(isSelecting ? clearSelection() : startSelection());
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      const key = `${location.pathname.split("/")[2]}/${decodeURIComponent(
        location.pathname.split("/")[3]
      )}`;
      sendToServerToDelete([key]);
      sessionStorage.removeItem(key);
      dispatch(updatePages());
      navigate("/Home");
    }
  }, [isHome, selected, location.pathname]);

  const exportFile = useCallback(() => {
    if (isHome && isSelecting && selected.length > 0) {
      dispatch(updateShowExpo(!showSomething));
      if (!showSomething) {
        dispatch(clearSelection());
        dispatch(stopSelection());
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      dispatch(updateShowExpo(!showSomething));
    }
  }, [isHome, selected, showSomething, location.pathname]);

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
          className="peni"
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
          <ShareIcon size={1} color="#2e2e2e" />
        </div>
        <div style={{ marginTop: "4%" }}>
          <Link to={"/About"}>
          <LogoIcon />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(UpperRightHomePgeNavbar);
