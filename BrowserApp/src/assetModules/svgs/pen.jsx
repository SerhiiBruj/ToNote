import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const PenIcon = (props) => {
  const [roll, setRoll] = useState(true);
  const location = useLocation();
  const page =location.pathname; 
  const ref = useRef();
  useEffect(() => {
    setRoll(true);
    ref.current.style.transform = "scaleX(-1)";
  }, [page]);

  return (
    <svg
      ref={ref}
      style={{ transform: "scaleX(-1)" }}
      onClick={() => {
        if (props.allow) {
          setRoll(!roll);
          ref.current.style.transition = "all ease 0.2s";
          if (roll) {
            ref.current.style.transform = "scaleX(1)";
          } else {
            ref.current.style.transform = "scaleX(-1)";
          }
        }
      }}
      width={`${76 * props.size}`}
      height={`${58 * props.size}`}
      viewBox="0 0 76 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="penSvg"
    >
      <rect
        style={roll ? { opacity: "0%" } : { opacity: "100%" }}
        width="42.4976"
        height="13.2248"
        rx="6.61238"
        transform="matrix(0.503848 0.863792 -0.86823 0.496161 11.4821 14.1339)"
        fill={props.color}
      />
      <rect
        style={roll ? { opacity: "0%" } : { opacity: "100%" }}
        width="61.253"
        height="13.2272"
        rx="6.61359"
        transform="matrix(-0.485508 0.874232 -0.878401 -0.477925 58 6.32153)"
        fill={props.color}
      />

      <path
        style={roll ? { opacity: "100%" } : { opacity: "0%" }}
        d="M7.265 3.86821C6.22138 2.83434 6.68329 1.60529 8.26207 1.21521C9.57097 0.89181 11.2285 1.25853 12.184 2.08289L61.2435 44.4092L51.9231 48.109L7.265 3.86821Z"
        fill={props.color}
      />

      <path
        style={roll ? { opacity: "100%" } : { opacity: "0%" }}
        d="M46.9321 37.0095L62.1853 47.0049L70.081 57.3481L55.429 49.8715L46.9321 37.0095Z"
        fill={props.color}
      />
    </svg>
  );
};

export default PenIcon;
