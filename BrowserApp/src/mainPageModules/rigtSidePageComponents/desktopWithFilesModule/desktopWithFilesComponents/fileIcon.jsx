import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { currentPage } from "../../../../redux/pageSlice";

const FileIcon = (props) => {
  const ref = useRef();
  const navigate = useNavigate();
  const [goto, setGoto] = useState(false);

  const page = useSelector((state) => state.pageType.value);
  console.log(page);
  const dispatch = useDispatch();



  useEffect(() => {
    if (page !== "Home") {
      if (ref.current) {
        ref.current.style.transition = "all ease 1s";
        ref.current.style.opacity = "0%";
        ref.current.style.transform = "scale(0)";
        setTimeout(() => {
          ref.current.style.display = "none";
        }, 500);
      }
    } else if (page.split(" ")[0] === "Home" && ref.current) {
      ref.current.style.opacity = "1";
      ref.current.style.transform = "scale(1)";
      ref.current.style.backgroundColor = "#d9d9d9";
      ref.current.style.display = "block";
    }
  }, [page]);




  const gotodestination = () => {
    if (ref.current) {
      setGoto(true);
      ref.current.style.transition = "all 0.3s";
      ref.current.style.transform = "scale(1.3)";
      setTimeout(() => {
        ref.current.style.backgroundColor = "#1e1e1e";
        ref.current.style.transform = "scale(0.7)";
        dispatch(currentPage(`${props.type +'/'+ props.name}`));
        setTimeout(() => {
          navigate(`${props.type}/${props.name}`);
        }, 300);
      }, 200);
    }
  };



  return (
    <div ref={ref} className="fileIconConteiner" onClick={gotodestination}>
      {!goto && (
        <>
          <span className="fileIconName">{props.name}</span>
          <br />
          <span className="fileIconType">{props.type}</span>
        </>
      )}
    </div>
  );
};

export default FileIcon;
