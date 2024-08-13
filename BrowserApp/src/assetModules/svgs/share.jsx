import React, { useEffect } from "react";
// 
const ShareIcon = (props) => {




  return (
    <svg
      width={props.size*52}
      height={props.size*56}
      viewBox="0 0 52 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.867432"
        y="9.89478"
        width="50.8909"
        height="46.1053"
        rx="20"
        fill={props.color}
      />
      <rect
        x="33.3438"
        y="15.7405"
        width="17.2068"
        height="14.062"
        transform="rotate(90 33.3438 15.7405)"
        fill="#D9D9D9"
      />
      <path
        d="M26.9823 0.289429L40.7095 17.8474H11.5811L26.9823 0.289429Z"
        fill="#D9D9D9"
      />
    </svg>
  );
};

export default ShareIcon;
