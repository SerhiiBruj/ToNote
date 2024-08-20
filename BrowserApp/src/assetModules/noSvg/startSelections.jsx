import { useDispatch, useSelector } from "react-redux";
import {
  clearSelection,
  startSelection,
  stopSelection,
} from "../../redux/selectSlice";

const StartSelection = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const dispatch = useDispatch();

  const select = () => {
    if (!isSelecting) {
      dispatch(startSelection());
    } else {
      dispatch(stopSelection());
      dispatch(clearSelection());
    }
  };

  return (
    <div
      className="selectCircle"
      onClick={select}
      style={{
        display:  "flex",
        background: isSelecting ? "rgb(46 46 46)" : "none",
        height: 50,
        width: 50,
        userSelect: "none",
        cursor: "pointer",
      }}
    >
      {isSelecting && selected.length > 0 && selected.length}
    </div>
  );
};

export default StartSelection;

("rgb(46 46 46)");
