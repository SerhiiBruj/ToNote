import { useCallback, useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import mylocalip from "../../../../../mylocalip";

const listOfFileTypes = ["dashboard", "note", "checklist", "todo", "table"];

const UpperRightHomePgeNavbar = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const showSomething = useSelector((state) => state.showExpo.value);
  const isEditable = useSelector((state) => state.isEditable.value);

  const [page, setPage] = useState("");
  const [isHome, setIsHome] = useState(true);
  const [showMenu, setShMe] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();


  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    const handleEdit = (event) => {
      console.log("object")
      if (event.ctrlKey && event.key.toLowerCase() === "e") {
        event.preventDefault();
        dispatch(edit());
        if (isSelecting) {
          dispatch(stopSelection());
          dispatch(clearSelection());
        }
      }
    };
    window.addEventListener("keydown", handleEdit);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleEdit);
    };
  }, []);

 

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
          "http://" + mylocalip + ":3000/delete-uploaded-file",
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
        if (!localStorage.getItem("beLocal")) sendToServerToDelete(selected);
        selected.forEach((file) => {
          if (sessionStorage.getItem(file)) sessionStorage.removeItem(file);
          else localStorage.removeItem(file);
        });
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
    if (isHome) {
      if (isSelecting && selected.length > 0) {
        dispatch(updateShowExpo(!showSomething));
        if (showSomething) {
          dispatch(clearSelection());
          dispatch(stopSelection());
        }
      } else if (selected.length === 0 && isSelecting)
        dispatch(stopSelection());
      else {
        dispatch(startSelection());
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      dispatch(updateShowExpo(!showSomething));
    }
  }, [isHome, selected, isSelecting, showSomething, location.pathname]);

  return (
    <div className="upperRightHomePageNavbar">
      <div
        className="backLeaf"
        style={{
          transition: "all ease 0.5s",
          opacity: !isHome ? "1" : "0",
          transform: !isHome ? "scale(1)" : "scale(0)",
          width:window.innerWidth>500 ? "20%": "25%"
        }}
      >
        <BackLeafIcon size={window.innerWidth>500?"30%":"20vw"} color={"#2e2e2e"} />
      </div>

      <div className="nameCont">
        <h1 className="Name">
          {decodeURIComponent(page.replace(/(%20|_)/g, " "))}
        </h1>
      </div>

      <div
        style={{ width: "fit-content" }}
        className="upperRightRightsectionHomePageNavbar"
      >
        <div
          className="upperRightRightsectionHomePageNavbar"
          style={{ width: "fit-content" }}
          id="showhideCont"
        >
          <div
            id="shdots"
            onClick={() => {
              setShMe(!showMenu);
              console.log(showMenu);
            }}
          >
            <div
              className="dots"
              style={{
                height: "1vw",
                width: "1vw",
                borderRadius: 60,
                margin: "0.2vw",
              }}
            ></div>
            <div
              className="dots"
              style={{
                margin: "0.2vw",
                height: "1vw",
                width: "1vw",
                borderRadius: 60,
              }}
            ></div>
            <div
              className="dots"
              style={{
                margin: "0.2vw",
                height: "1vw",
                width: "1vw",
                borderRadius: 60,
              }}
            ></div>
          </div>
          <div
            className="inst"
            style={{
              transition: "all ease 0.2s",
              transform: isHome ? "none" : "scale(0)",
              opacity: isHome ? 1 : 0,
              display: showMenu && width < 480 ? "none" : "flex",
            }}
            title="Select"
          >
            <StartSelection />
          </div>
          <div
            className="peni inst "
            style={{
              display: showMenu && width < 480 ? "none" : "flex",
            }}
            tabIndex="0"
            onClick={() => {
              dispatch(edit());
              if (isSelecting) {
                dispatch(stopSelection());
                dispatch(clearSelection());
              }
            }}
            accessKey="w"
            title="Edit"
          >
            <PenIcon size={0.9} color="#2e2e2e" roll={isEditable} />
          </div>
          <div
            style={{
              display: showMenu && width < 480 ? "none" : "flex",
            }}
            onClick={deleteFile}
            className="inst"
            title="Delete"
            tabIndex="0"
          >
            <BinIcon size={1} color="#2e2e2e" />
          </div>
          <div
            style={{
              display: showMenu && width < 480 ? "none" : "flex",
            }}
            className="inst"
            onClick={(e) => {
              e.stopPropagation();
              exportFile();
            }}
            title="Share"
            tabIndex="0"
          >
            <ShareIcon size={1} color="#2e2e2e" />
          </div>
        </div>

        <div
          style={{
            height: "100%",
            marginTop: "0%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => {
            navigate("/About");
          }}
          title="Go to about page"
        >
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default memo(UpperRightHomePgeNavbar);
