import { memo } from "react";
import { NavLink } from "react-router-dom";

const ListOfSettings = () => {
  let Settings = [
    "Account settings",
    "Appearance",
    "Storage",
    "Terms and Policy",
  ];
  

  return (
    <div className="listOfSettings">
      {Settings.map((set, index) => (
        <div key={index}>
          <NavLink
          
            className={({ isActive }) =>
              `${isActive ? "activeNav" : "inactiveNav"} navLink`
            }
            to={`Settings/${set.replace(/( )/g, "_")}`}
          >
            <div key={index} className="FileInNavbar" >
              <p className="textInFileInNavbar">{set}</p>
            </div>
          </NavLink>
          </div>
      ))}
    </div>
  );
};

export default memo( ListOfSettings);

{
  /* <div className="listOfFiles">
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
       
        )} */
}
//       </div>
//     </NavLink>
//   </>
// ))}
// </div> */}
