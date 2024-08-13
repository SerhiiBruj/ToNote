import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { doAnimate, donotanimate } from "../../../../redux/startAnimation";

const FileIcon = (props) => {
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const dispatch = useDispatch();
  const ref = useRef();
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (boolAnimate) {
      ref.current.style.transition = "all ease 0.6s";
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
  }, [location.pathname, page]);

  const gotodestination = () => {
    if (ref.current) {
      ref.current.style.transition = "all 0.3s";
      ref.current.style.transform = "scale(1.3)";
      setTimeout(() => {
        ref.current.style.backgroundColor = "#1e1e1e";
        ref.current.style.transform = "scale(0.7)";
        dispatch(doAnimate());
        setTimeout(() => {
          navigate(`${props.type}/${props.name}`);
        }, 200);
      }, 400);
    }
  };

  return (
    <div ref={ref} className="fileIconConteiner" onClick={gotodestination}>
      {!boolAnimate && (
        <>
          <span className="fileIconName">{props.name}</span>
          <br />
          <span className="fileIconType">{props.type}</span>
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
