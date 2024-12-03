import { useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Note = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const textareaRef = useRef(null);
  const [text, setText] = useLocalStorage("note/", "");

  useEffect(() => {
    location.pathname.split("/")[1] === "Home" ? "flex" : "none";
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
    console.log("note");
  }, []);

  const handleTextChange = (event) => {
    setText(event.target.value);
    console.log(text);
  };

  return (
    <div
      style={{ height: "90%" }}
      onClick={(e) => {
        e.stopPropagation();
      }}
      className=" conteiner fileConteiner"
    >
      <div
        className="contic"
        style={{ paddingTop: 20, width: "100%", height: "100%" }}
      >
        <textarea
          style={{
            width: "100%",
            height: "100% !important",
            minHeight: "90%",
            margin: 0,
          }}
          disabled={!isEditable}
          ref={textareaRef}
          className="texarea"
          placeholder="Type here..."
          value={text}
          onChange={(e) => handleTextChange(e)}
          autoFocus
        />
      </div>
    </div>
  );
};

export default memo(Note);
