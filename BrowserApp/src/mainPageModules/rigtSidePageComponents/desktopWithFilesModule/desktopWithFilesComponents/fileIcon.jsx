import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doAnimate } from "../../../../redux/startAnimation";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import IsSelected from "../../../../assetModules/noSvg/isSelected";
import { deSelect, select } from "../../../../redux/selectSlice";
import { updatePages } from "../../../../redux/pagesSlice";

const FileIcon = (props) => {
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const isEditable = useSelector((state) => state.isEditable.value);
  const { isSelecting, selected } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  const ref = useRef();
  const navigate = useNavigate();
  const [name, setName] = useState(props.name);

  useEffect(() => {
    setName(props.name);
  }, [props.name]);

  const handleSelect = (e) => {
    e.stopPropagation();

    if (!selected.includes(`${props.type}/${name}`)) {
      dispatch(select(`${props.type}/${name}`));
    } else {
      dispatch(deSelect(`${props.type}/${name}`));
    }
  };

  useEffect(() => {
    if (boolAnimate) {
      ref.current.style.transition = "all ease 0.5s";
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
    }
  }, [boolAnimate]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const renameLocalStorageKey = (oldKey, newKey) => {
    console.log(oldKey, newKey);
    if (typeof newKey === "string" && newKey.split("/")[1].trim() !== "") {
      if (!newKey || newKey === oldKey) {
        setName(oldKey.split("/")[1]); // Повернення до старого імені, якщо новий ключ порожній або такий самий
        console.log(
          "Новий ключ не може бути порожнім або таким самим, як старий ключ."
        );
        return;
      }
      if (Object.keys(sessionStorage).includes(newKey)) {
        console.log(`Ключ "${newKey}" вже існує.`);
        return;
      }

      const oldValue = sessionStorage.getItem(oldKey);
      if (oldValue !== null) {
        sessionStorage.setItem(newKey, oldValue);
        sessionStorage.removeItem(oldKey);
        dispatch(updatePages(Object.keys(sessionStorage)));
      } else {
        console.log(`Ключ "${oldKey}" не знайдено.`);
      }
    }
    setName(props.name);
  };

  const gotodestination = useCallback(() => {
    if (ref.current) {
      ref.current.style.transition = "all ease 0.4s";
      ref.current.style.transform = "scale(1.2)";
      setTimeout(() => {
        ref.current.style.backgroundColor = "#1e1e1e";
        ref.current.style.transform = "scale(0)";
        setTimeout(() => {
          dispatch(doAnimate());
          setTimeout(() => {
            navigate(`${props.type}/${props.name}`);
          }, 300);
        }, 100);
      }, 400);
    }
  }, [dispatch, navigate, props.type, props.name]);

  return (
    <div
      ref={ref}
      className="fileIconConteiner"
      onClick={(e) => {
        e.stopPropagation();
        !isSelecting && !isEditable
          ? gotodestination()
          : isSelecting && handleSelect(e);
      }}
      onBlur={() =>
        isEditable &&
        renameLocalStorageKey(
          `${props.type}/${props.name}`,
          `${props.type}/${name}`
        )
      }
    >
      {!boolAnimate && (
        <>
          <div style={{ height: "70%", overflow: "hidden" }}>
           
              <input
                style={{
                  pointerEvents: isEditable ? "all" : "none",
                  transition: "0.2s all ease",
                  animation:
                    props.name.length > 16 && !isEditable
                      ? "scrollText 5s linear infinite"
                      : "none",
                }}
                onChange={(e) => handleChange(e)}
                className={`texarea fileIconName ${
                  props.name.length > 16 && "scroll-container"
                }`}
                disabled={!isEditable}
                value={!isEditable ? props.name  : name}
              />
            
            <span className="fileIconType">{props.type}</span>
          </div>
          <div
            style={{
              display: "flex",
              height: "30%",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <div>
              <IsSelected
                isSelected={selected.some(
                  (item) => item === `${props.type}/${name}`
                )}
              />
            </div>

            <div
              style={{
                display:
                  props.type === "todo" ||
                  props.type === "dashboard" ||
                  props.type === ""
                    ? "flex"
                    : "none",
              }}
            >
              <BellsIcon size={1.3} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

FileIcon.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
};

export default FileIcon;
