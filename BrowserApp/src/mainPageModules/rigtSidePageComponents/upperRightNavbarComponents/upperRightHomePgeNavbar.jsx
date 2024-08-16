import  { useEffect, useState } from "react";
import LogoIcon from "../../../assetModules/svgs/logo";
import ShareIcon from "../../../assetModules/svgs/share";
import BinIcon from "../../../assetModules/svgs/bin";
import PenIcon from "../../../assetModules/svgs/pen";
import { useDispatch} from "react-redux";
import { edit, editPayload } from "../../../redux/isEditable";
import BackLeafIcon from "../../../assetModules/svgs/backLeaf";
import { useLocation } from "react-router-dom";

const UpperRightHomePgeNavbar = () => {
  const [page, setPage] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {

    if (location.pathname.split("/")[3])
      setPage(location.pathname.split("/")[3]);
    else setPage(location.pathname.split("/")[1]);
  }, [location.pathname]);

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
        <h1 className="Name">{page}</h1>
      </div>

      <div className="upperRightRightsectionHomePageNavbar">
        <div
        className="peni"
          onClick={() => {
            if (location.pathname.split("/")[3]) dispatch(edit());
          }}
        >
          <PenIcon
            size={0.9}
            color="#2e2e2e"
            allow={page !== "Home" ? true : false}
          />
        </div>
        <BinIcon size={1} color="#2e2e2e" />
        <ShareIcon size={1} color={"#2e2e2e"} />
        <div style={{ marginTop: "4%" }}>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default UpperRightHomePgeNavbar;
