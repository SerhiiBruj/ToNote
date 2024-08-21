import { useEffect, useRef, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Note = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const textareaRef = useRef(null);
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);
  const [text, setText] = useLocalStorage(typeName,'');
 

  useEffect(() => {
     location.pathname.split("/")[1] === "Home" ? "flex" : "none"
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text]); 

  const handleTextChange = useCallback((event) => {
    const newText = event.target.value;
    setText(newText);
  }, [typeName]);

  return (
    <div style={{ height: "90%", paddingLeft: 50 }} 
    
    onClick={(e)=>e.stopPropagation()}
    >
      <div className="contic">
        <div style={{ paddingTop: 45 }}></div>
        <textarea
          disabled={!isEditable}
          ref={textareaRef}
          className="texarea"
          value={text}
          onChange={(e)=>handleTextChange(e)}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Note;