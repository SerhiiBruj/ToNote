import { NavLink } from "react-router-dom";

const ListOfSettings = () => {
  let Settings = [
    "Local storage",
    "Appearance",
    "Account settings",
    "Terms and Policy",
  ];

  return (
    <div className="listOfSettings">
      {Settings.map((set, index) => (
        <>
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
        </>
      ))}
    </div>
  );
};

export default ListOfSettings;

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
