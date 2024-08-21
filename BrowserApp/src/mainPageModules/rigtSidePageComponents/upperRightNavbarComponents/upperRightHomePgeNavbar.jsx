import { useEffect, useState } from "react";
import LogoIcon from "../../../assetModules/svgs/logo";
import ShareIcon from "../../../assetModules/svgs/share";
import BinIcon from "../../../assetModules/svgs/bin";
import PenIcon from "../../../assetModules/svgs/pen";
import { useDispatch, useSelector } from "react-redux";
import isEditable, { edit, editPayload } from "../../../redux/isEditable";
import BackLeafIcon from "../../../assetModules/svgs/backLeaf";
import { useLocation } from "react-router-dom";
import StartSelection from "../../../assetModules/noSvg/startSelections";
import { updatePages } from "../../../redux/pagesSlice";
import { clearSelection, stopSelection } from "../../../redux/selectSlice";

const UpperRightHomePgeNavbar = () => {
  const { isSelecting,selected } = useSelector((state) => state.select);
  const [page, setPage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[3])
      setPage(location.pathname.split("/")[3]);
    else setPage(location.pathname.split("/")[1]);
  }, [location.pathname]);

  const deleteFile = () => {
    if (selected.length > 0) {
      for (let file of selected) {
        localStorage.removeItem(file);
      }
      dispatch(updatePages(Object.keys(localStorage)));
      dispatch(stopSelection());
      dispatch(clearSelection());
    } else {
      alert("please choose file to delete");
    }
  };

  
  return (
    <div className="upperRightHomePageNavbar">
      <div
        style={{
          transition: "all ease 0.5s",
          opacity: page !== "Home" ? "1" : "0",
          transform: page !== "Home" ? "scale(1)" : "scale(0)",
        }}
        onClick={() => {
          dispatch(editPayload(false));
        }}
      >
        <BackLeafIcon size={0.8} color={"#2e2e2e"} />
      </div>

      <div>
        <h1 className="Name">{page.replace('%20'," ")}</h1>
      </div>

      <div className="upperRightRightsectionHomePageNavbar">
        <div
          style={{
            visibility: page === "Home" ? "visible" : "hidden",
          }}
        >
          <StartSelection />
        </div>
        <div
          className="peni"
          onClick={() => {
             dispatch(edit())
             if(isSelecting){
              dispatch(stopSelection());
              dispatch(clearSelection());
             }
          }}
        >
          <PenIcon
            size={0.9}
            color="#2e2e2e"
            roll={isEditable}
          />
        </div>
        <div onClick={deleteFile}>
          <BinIcon size={1} color="#2e2e2e" />
        </div>
        <ShareIcon size={1} color={"#2e2e2e"} />
        <div style={{ marginTop: "4%" }}>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default UpperRightHomePgeNavbar;
