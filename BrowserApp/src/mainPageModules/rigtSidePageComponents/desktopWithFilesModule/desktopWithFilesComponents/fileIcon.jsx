import PropTypes from "prop-types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doAnimate, donotanimate } from "../../../../redux/startAnimation";
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
      dispatch(donotanimate());
    }
  }, [boolAnimate]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const renameLocalStorageKey = (oldKey, newKey) => {
    if (!newKey || newKey === oldKey) {
      console.log(
        "Новий ключ не може бути порожнім або таким самим, як старий ключ."
      );
      return;
    }

    if (localStorage.getItem(newKey) !== null) {
      console.log(`Ключ "${newKey}" вже існує.`);
      return;
    }

    const oldValue = localStorage.getItem(oldKey);
    if (oldValue !== null) {
      localStorage.setItem(newKey, oldValue);
      localStorage.removeItem(oldKey);
      dispatch(updatePages(Object.keys(localStorage)));
    } else {
      console.log(`Ключ "${oldKey}" не знайдено.`);
    }
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
          <div style={{ height: "70%" }}>
            <textarea
              onChange={(e) => handleChange(e)}
              className="texarea fileIconName"
              disabled={!isEditable}
              value={!isEditable ? props.name : name}
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
                typename={`${props.type}/${name}`}
                isSelected={selected.includes(`${props.type}/${name}`)}
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
