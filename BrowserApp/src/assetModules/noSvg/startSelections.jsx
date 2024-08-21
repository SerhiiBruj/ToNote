import { useDispatch, useSelector } from "react-redux";
import {
  clearSelection,
  startSelection,
  stopSelection,
} from "../../redux/selectSlice";
import { editPayload } from "../../redux/isEditable";

const StartSelection = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const isEditable = useSelector((state) => state.isEditable);
  const dispatch = useDispatch();

  const select = () => {
    if (!isSelecting) {
      if (isEditable) {
        dispatch(editPayload(false));
      }
      dispatch(startSelection());
    } else {
      dispatch(stopSelection());
      dispatch(clearSelection());
    }
  };

  return (
    <div
      className="selectCircle"
      onClick={(e) => {
        e.stopPropagation();
        select();
      }}
      style={{
        display: "flex",
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
