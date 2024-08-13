import React from "react";
import ListOfSettings from "./listOfSettings";
import ListOfFiles from "./listOfFiles";

const Scrollpanel = () => {
  return (
    <div className="scrollpanel">
      <ListOfFiles />
      <ListOfSettings />
    </div>
  );
};

export default Scrollpanel;
