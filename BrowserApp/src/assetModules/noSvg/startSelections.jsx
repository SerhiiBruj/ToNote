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
      className="selectCircle hoverSvg"
      onClick={(e) => {
        e.stopPropagation();
        select();
      }}
      style={{
        background: isSelecting ? "rgb(46 46 46)" : "none",
        borderColor: isSelecting && "#474747",
        height: 50,
        width: 50,
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.borderColor = "#474747";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.borderColor = "rgb(46 46 46)";
      }}
    >
      {isSelecting && selected.length > 0 && selected.length}
    </div>
  );
};

export default StartSelection;

("rgb(46 46 46)");