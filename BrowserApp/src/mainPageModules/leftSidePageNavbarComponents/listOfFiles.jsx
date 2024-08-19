import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Circle from "../../assetModules/noSvg/circle";

const ListOfFiles = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage).map((key) => ({
      key,
    }));
    setItems(items);
  }, [localStorage.keys]);

  return (
    <div className="listOfFiles">
      {items.map((item) => (
        <>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "activeNav" : "inactiveNav"} navLink`
            }
            to={`${item.key}`}
          >
            <div key={item.key} className="FileInNavbar">
              <p className="textInFileInNavbar">{item.key.split("/")[1]}</p>
              {item.key.split("/")[0] === "note" ? (
                <Circle size={30} color={"#123123"} />
              ) : item.key.split("/")[0] === "todo" ? (
                <Circle size={30} color={"rgb(0 52 79)"} />
              ) : item.key.split("/")[0] === "checklist" ? (
                <Circle size={30} color={"hsl(94.15deg 32.95% 37.42%)"} />
              ) : item.key.split("/")[0] === "table" ? (
                <Circle size={30} color={"rgb(83 43 81)"} />
              ) :item.key.split("/")[0] === "diary" ? (
                <Circle size={30} color={"skyblue"} />
              ) :item.key.split("/")[0] === "dashboard"&& (
                <Circle size={30} color={"skyblue"} />
              ) }
            </div>
          </NavLink>
        </>
      ))}
    </div>
  );
};

export default ListOfFiles;
