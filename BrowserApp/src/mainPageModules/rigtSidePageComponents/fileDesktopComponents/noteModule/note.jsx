import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

const Note = () => {
  const [text, setText] = useState("");
  const isEditable = useSelector((state) => state.isEditable.value);
  const textareaRef = useRef(null);
  const location = useLocation();
  const typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    const savedText = localStorage.getItem(typeName);
    if (savedText) {
      setText(savedText);
    }
  }, [typeName]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]); // Оновлення висоти при зміні тексту

  const handleTextChange = useCallback((event) => {
    const newText = event.target.value;
    setText(newText);
    localStorage.setItem(typeName, newText);
  }, []);

  return (
    <div style={{ height: "90%", paddingLeft: 50 }}>
      {isEditable ? (
        <div className="contic">
          <div style={{ paddingTop: 45 }}></div>
          <textarea
            ref={textareaRef}
            className="texarea"
            value={text}
            onChange={handleTextChange}
            autoFocus
          />
        </div>
      ) : (
        <div className="contic">
          <div style={{ paddingTop: 45 }}></div>
          <p
            style={{
              color: "#bfbfbf",
              whiteSpace: "pre-wrap",
              transition: "all ease 1s",
              padding: 20,
              fontSize: 25,
              width: "90%",
              height: "fit-content",
            }}
          >
            {text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Note;
