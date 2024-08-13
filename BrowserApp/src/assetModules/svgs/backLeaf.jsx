import React from "react";
import { useNavigate } from "react-router-dom";

const BackLeafIcon = (props) => {
  const navigate =useNavigate()
  return (
    <svg  onClick={()=>{navigate(-1)}}
      width={props.size * 155}
      height={props.size * 78}
      viewBox="0 0 155 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M122.278 34.6667L155 26V31.2L122.278 43.3333V34.6667Z"
        fill={props.color}
      />
      <path
        d="M92.9999 0C132.611 -2.81016e-05 132.948 78 92.9999 78C41.3333 78 0 36.4 0 36.4C0 36.4 30.9999 3.46667 92.9999 0Z"
        fill={props.color}
      />
    </svg>
  );
};

export default BackLeafIcon;
