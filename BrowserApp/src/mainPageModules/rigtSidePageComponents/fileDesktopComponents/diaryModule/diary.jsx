import { useEffect, useRef, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import Arrow from "../../../../assetModules/svgs/arrow";

const Diary = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const textareaRef = useRef(null);
  const location = useLocation();

  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);

  const getCurrentDate = () => {
    const date = new Date();
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  };

  const [text, setText] = useLocalStorage(typeName, [
    { date: getCurrentDate(), value: "" },
  ]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [text, page]);

  useEffect(() => {
    if (!isEditable) {
      setText(text.filter((o) => o.value.trim() !== ""));
    }
  }, [isEditable]);

  const changepage = (s) => {
    console.log(`Current page: ${page}, Total pages: ${text.length}`);
    if (s) {
      if (text.length > page + 1) {
        setPage(page + 1);
      } else {
        setText([...text, { date: getCurrentDate(), value: "" }]);
        setPage(page + 1);
      }
    } else if (page > 0) {
      setPage(page - 1);
    } else {
      alert("you cannot do this");
    }
  };

  const handleTextChange = (event) => {
    const newText = event.target.value;
    const updatedText = [...text];
    updatedText[page] = {
      date: updatedText[page]?.date || getCurrentDate(),
      value: newText,
    };
    setText(updatedText);
  };

  return (
    <div
      className="diary-container"
      onClick={(e) => {
        if (isEditable) e.stopPropagation();
      }}
    >
      <div className="diary-header">
        <div
          style={{ visibility: page === 0 ?"hidden":"visible" }}
          onClick={() => changepage(false)}
          className="arrow-container"
        >
          <Arrow size={"5vh"} />
        </div>
        <span className="diary-date">{text[page]?.date}</span>
        <div
          style={{ visibility: page === text.length-1 && !isEditable ?"hidden":"visible"  }}

          onClick={() => changepage(true)}
          className="arrow-container arrow-rotated"
        >
          <Arrow size={"5vh"} />
        </div>
      </div>

      <div className="diary-content">
        <textarea
          disabled={!isEditable}
          ref={textareaRef}
          className="diary-textarea"
          value={text[page]?.value || ""}
          onChange={handleTextChange}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Diary;
