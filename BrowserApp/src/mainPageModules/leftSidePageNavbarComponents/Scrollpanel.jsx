import ListOfSettings from "./listOfSettings";
import ListOfFiles from "./listOfFiles";
import Ard from "../../assetModules/svgs/ard";
import { useState } from "react";
import { useSelector } from "react-redux";

const Scrollpanel = () => {
  const pages = useSelector((state) => state.pages.value);

  const [allow, setAllow] = useState(false);
  return (
    <div className="scrollpanel" style={{ borderTop: "#cfcfcf solid 5px" }}>
      <ListOfFiles allow={allow} />
      <div
        onClick={() => setAllow((prev) => !prev)}
        style={{
          height: pages.length > 4 ? 40 : 20,
          width: "100%",
          background: "#cfcfcf",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          transition: "all ease 0.5s",
        }}
      >
        <div
          style={{
            display: pages.length > 4 ? "flex" : "none",
            transform: allow ? "none" : "rotate(180deg)",
            transition: "all ease 0.2s",
          }}
        >
          <Ard />
        </div>
      </div>
      <ListOfSettings />
    </div>
  );
};

export default Scrollpanel;
