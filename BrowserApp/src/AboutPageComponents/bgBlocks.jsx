import React from "react";

// eslint-disable-next-line react/prop-types
const BgBlocks = ({ children, num, text }) => {
  return (
    <div className="container-of-blocks" style={{ position: "relative" }}>
      {Array.from({ length: num }).map((_, i) => (
        <div
          key={i}
          className="bgtransblock"
          style={{
            backgroundColor: "#858585",
            height: Math.floor(Math.random() * (400 - 200 + 1)) + 200, 
            width: Math.floor(Math.random() * (400 - 200 + 1)) + 200, 
            borderRadius: 20,
            opacity: 0.3,
            zIndex: 0,
            position: "absolute", 
            transform: `translateX(${
              (Math.random() * (150 - 50) + 50) * (Math.random() < 0.5 ? -1 : 1)
            }px) translateY(${
              (Math.random() * (150 - 50) + 50) * (Math.random() < 0.5 ? -1 : 1)
            }px)`, 
          }}
        ></div>
      ))}

      <div
        style={{
          height: "auto",
          backgroundColor: "#858585a1",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          maxWidth: 450,
          borderRadius: 20,
          zIndex: 5,
          
        }}
      >
        <span style={{
          padding: 40,
          color: "#1e1e1e",
          fontSize: 23,
          textAlign: "left",
          textWrap:"pretty"

        }}>

        {text}
        </span>

        {children}
      </div>
    </div>
  );
};

export default BgBlocks;
