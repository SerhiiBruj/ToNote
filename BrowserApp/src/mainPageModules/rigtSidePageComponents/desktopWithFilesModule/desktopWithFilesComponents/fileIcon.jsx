import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { doAnimate, donotanimate } from "../../../../redux/startAnimation";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";

const FileIcon = (props) => {
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const dispatch = useDispatch();
  const ref = useRef();
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (boolAnimate) {
      ref.current.style.transition = "all ease 0.5s";
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
    }
  }, [boolAnimate]);

  useEffect(() => {
    if (location.pathname.split("/")[3])
      setPage(location.pathname.split("/")[3]);
    else setPage(location.pathname.split("/")[1]);

    if (page !== "Home" && ref.current) {
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
    } else if (page === "Home" && ref.current) {
      ref.current.style.opacity = "1";
      ref.current.style.transform = "scale(1)";
      ref.current.style.backgroundColor = "#d9d9d9";
      ref.current.style.display = "block";
      dispatch(donotanimate());
    }
  }, [dispatch, location.pathname, page]);

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
  });

  return (
    <div ref={ref} className="fileIconConteiner">
      {!boolAnimate && (
        <>
          <div onClick={gotodestination} style={{ height: "70%" }}>
            <span className="fileIconName">{props.name}</span>
            <br />
            <span className="fileIconType">{props.type}</span>
          </div>
          <div
            style={{
              display: "flex",
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
