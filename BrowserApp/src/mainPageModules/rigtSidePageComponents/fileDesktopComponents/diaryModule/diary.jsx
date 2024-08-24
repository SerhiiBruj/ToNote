import  { useEffect, useState, useRef, useCallback } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Diary = () => {
  const [text, setText] = useState("");
  const isEditable = useSelector((state) => state.isEditable.value);
  const textareaRef = useRef(null);
  const location = useLocation();
  const typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    try {
      const savedText = localStorage.getItem(typeName);
      if (savedText) {
        setText(savedText);
      }
    } catch (error) {
      console.error("Failed to load saved text from localStorage:", error.message);
    }
  }, [typeName]);
  

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]);
  
  const handleTextChange = useCallback((event) => {
    const newText = event.target.value;
    setText(newText);
    localStorage.setItem(typeName, newText);
  }, [typeName]);
  

  return (
    <div style={{ height: "90%", paddingLeft: 50 }}
    
    onClick={(e) => e.stopPropagation()}>
      <div className="contic fileConteiner">
        <div style={{ paddingTop: 45 }}></div>
        <textarea
          disabled={!isEditable}
          ref={textareaRef}
          className="texarea"
          value={text}
          onChange={handleTextChange}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Diary;
