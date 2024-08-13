import React from "react";

const Circle = (props) => {
  return (
    <div
      style={{
        backgroundColor: props.color,
        height: props.size,
        width: props.size,
        borderRadius: "50%",
        position:'relative',
        top:0
      }}
    ></div>
  );
};

export default Circle;
