import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doAnimate, donotanimate } from "../../../../redux/startAnimation";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import IsSelected from "../../../../assetModules/noSvg/isSelected";
import { deSelect, select } from "../../../../redux/selectSlice";

const FileIcon = (props) => {
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const { isSelecting, selected } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();
  let typename=`${props.type}/${props.name}`;


  

  
  const handleSelect = (e) => {
    e.stopPropagation(); 

    if (!selected.includes(typename)) {
      dispatch(select(typename)); 
    }
    else{
        dispatch(deSelect(typename)); 
    }
  };

  useEffect(() => {
    if (boolAnimate) {
      ref.current.style.transition = "all ease 0.5s";
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
      dispatch(donotanimate());
    }
  }, [boolAnimate]);

  const gotodestination = useCallback(() => {
    if (ref.current) {
      ref.current.style.transition = "all ease 0.4s";
      ref.current.style.transform = "scale(1.2)";
      setTimeout(() => {
        ref.current.style.backgroundColor = "#1e1e1e";
        ref.current.style.transform = "scale(0)";
        setTimeout(() => {
          dispatch(doAnimate());
          setTimeout(() => {
            navigate(`${props.type}/${props.name}`);
          }, 300);
        }, 100);
      }, 400);
    }
  }, [dispatch, navigate, props.type, props.name]);
  return (
    <div ref={ref} className="fileIconConteiner" onClick={(e)=>{!isSelecting?gotodestination():handleSelect(e)}}>
      {!boolAnimate && (
        <>
          <div style={{ height: "70%" }}>
            <span className="fileIconName" >{props.name}</span>
            <br/>
            <span className="fileIconType">{props.type}</span>
          </div>
          <div
            style={{
              display: "flex",
              height: "30%",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <IsSelected typename={typename} isSelected={selected.includes(typename)}/>
            </div>

            <div
              style={{
                display:
                  props.type === "todo" ||
                  props.type === "dashboard" ||
                  props.type === ""
                    ? "flex"
                    : "none",
              }}
            >
              <BellsIcon size={1.3} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

FileIcon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FileIcon;
