import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const ListOfFiles = ({ allow }) => {
  const pages = useSelector((state) => state.pages.value);

  return (
    <div className="listOfFiles">
      {pages.map((item, index) => {
        const isAfterFourth = index >= 4;
        const height = isAfterFourth && allow && "0";
        const transform = isAfterFourth
          ? allow
            ? "scaleY(0)"
            : "scaleY(1)"
          : "scaleY(1)";
        const borders = isAfterFourth
          ? allow
            ? "none"
            : "#cfcfcf 5px solid"
          : "#cfcfcf 5px solid";
        return (
          <NavLink
            key={item}
            className={({ isActive }) =>
              `${isActive ? "activeNav" : "inactiveNav"} navLink`
            }
            to={`${item}`}
          >
            <div
              style={{
                height: height,
                transform: transform,
                transition: "all 0.1s ease",
                overflow: "hidden",
                borderTop: borders,
                borderBottom: borders,
                transformOrigin: "bottom",
              }}
              className="FileInNavbar"
            >
              <p className="textInFileInNavbar">{item.split("/")[1]}</p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};

export default ListOfFiles;
