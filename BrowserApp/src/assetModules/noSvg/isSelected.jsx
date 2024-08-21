/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";

const IsSelected = ({ isSelected }) => {
  const { isSelecting } = useSelector((state) => state.select);
  return (
    <div className="selcirc"
      style={{
        transform: isSelecting ? "none" : "scale(0)",
        opacity: isSelecting ? 1 : 0,
      }}
    >
      <div
        className="selectCircle"
        style={{
          background: isSelected ? "rgb(46 46 46 )" : "none",
        }}
      ></div>
    </div>
  );
};

export default IsSelected;
