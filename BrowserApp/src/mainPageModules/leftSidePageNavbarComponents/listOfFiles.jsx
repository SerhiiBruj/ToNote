import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

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
            <div className="FileInNavbar">
              <p key={item.key}>{item.key}</p>
            </div>
          </NavLink>
        </>
      ))}
    </div>
  );
};

export default ListOfFiles;
