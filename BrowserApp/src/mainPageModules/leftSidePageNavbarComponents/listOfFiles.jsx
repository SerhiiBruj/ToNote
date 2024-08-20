import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ListOfFiles = () => {
  const pages = useSelector((state) => state.pages.value);
 

  return (
    <div className="listOfFiles">
      {pages.map((item) => (
        <>
          <NavLink
            className={({ isActive }) =>
              `${isActive ? "activeNav" : "inactiveNav"} navLink`
            }
            to={`${item}`}
          >
            <div key={item} className="FileInNavbar">
              <p className="textInFileInNavbar">{item.split("/")[1]}</p>
              {/* {item.split("/")[0] === "note" ? (
                <Circle size={30} color={"#123123"} />
              ) : item.split("/")[0] === "todo" ? (
                <Circle size={30} color={"rgb(0 52 79)"} />
              ) : item.split("/")[0] === "checklist" ? (
                <Circle size={30} color={"hsl(94.15deg 32.95% 37.42%)"} />
              ) : item.split("/")[0] === "table" ? (
                <Circle size={30} color={"rgb(83 43 81)"} />
              ) : item.split("/")[0] === "diary" ? (
                <Circle size={30} color={"skyblue"} />
              ) : (
                item.split("/")[0] === "dashboard" && (
                  <Circle size={30} color={"skyblue"} />
                )
              )} */}
            </div>
          </NavLink>
        </>
      ))}
    </div>
  );
};

export default ListOfFiles;
