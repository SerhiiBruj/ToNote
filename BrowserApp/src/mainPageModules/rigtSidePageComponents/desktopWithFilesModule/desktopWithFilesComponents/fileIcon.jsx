import PropTypes from "prop-types";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doAnimate, donotanimate } from "../../../../redux/startAnimation";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";

const FileIcon = (props) => {
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();

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
``
  return (
    <div ref={ref} className="fileIconConteiner" onClick={gotodestination}>
      {!boolAnimate && (
        <>
          <div style={{ height: "70%" }}>
            <span className="fileIconName">{props.name}</span>
            <br />
            <span className="fileIconType">{props.type}</span>
          </div>
          <div
            style={{
              display:
                props.type === "todo" || props.type === "dashboard"
                  ? "flex"
                  : "none",
              height: "30%",
              alignItems: "flex-end",
              justifyContent: "flex-end",
            }}
          >
            <BellsIcon size={1.3} />
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
