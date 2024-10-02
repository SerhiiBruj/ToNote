import { memo } from "react";
import Profile from "./profile";
import Scrollpanel from "./Scrollpanel";

const LeftHomePageNavbar = () => {
  return (
    <div className="leftHomePageNavbar" >
      <Profile/>
      <Scrollpanel/>
    </div>
  );
};

export default memo(LeftHomePageNavbar);
