import PropTypes from "prop-types";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doAnimate } from "../../../../redux/startAnimation";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import IsSelected from "../../../../assetModules/noSvg/isSelected";
import { deSelect, select } from "../../../../redux/selectSlice";
import { updatePages } from "../../../../redux/pagesSlice";
import axios from "axios";
import mylocalip from "../../../../../../mylocalip";

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

  const handleSelect = useCallback(
    (e) => {
      e.stopPropagation();
      const fileKey = `${props.type}/${name}`;
      if (!selected.includes(fileKey)) {
        dispatch(select(fileKey));
      } else {
        dispatch(deSelect(fileKey));
      }
    },
    [selected, dispatch, name, props.type]
  );

  useEffect(() => {
    if (ref.current && boolAnimate) {
      ref.current.style.transition = "all ease 0.5s";
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
    }
  }, [boolAnimate]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const renameLocalStorageKey = async (oldKey, newKey) => {
    if (typeof newKey !== "string" || !newKey.trim() || newKey === oldKey) {
      setName(oldKey.split("/")[1]);
      console.log("Новий ключ не може бути порожнім або таким самим.");
      return;
    }

    if (Object.keys(sessionStorage).includes(newKey)) {
      console.log(`Ключ "${newKey}" вже існує.`);
      return;
    }

    let oldValue =
      sessionStorage.getItem(oldKey) || localStorage.getItem(oldKey);
    if (oldValue !== null) {
      if (localStorage.getItem(oldKey)) {
        localStorage.setItem(newKey, oldValue);
        localStorage.removeItem(oldKey);
        dispatch(updatePages(Object.keys(sessionStorage)));
      }
      if (sessionStorage.getItem(oldKey)) {
        sessionStorage.setItem(newKey, oldValue);
        sessionStorage.removeItem(oldKey);

        const token = localStorage.getItem("token");
        if (!token) {
          console.log("Токен не знайдено, будь ласка, увійдіть у систему.");
          return;
        }
        if (!localStorage.getItem("beLocal")) {
          try {
            const res = await axios.post(
              "http://"+mylocalip+":3000/rename-uploaded-file",
              {
                rnfile: oldKey,
                newName: newKey,
              },
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            if (res.status === 200) {
              console.log("Файл успішно перейменовано");
              dispatch(updatePages(Object.keys(sessionStorage)));
            } else {
              console.log(
                "Сталася помилка при перейменуванні файлу:",
                res.data
              );
            }
          } catch (error) {
            console.error("Помилка при зверненні до сервера:", error);
          }
        }
      }
    } else if (localStorage.getItem(oldKey)) {
      oldValue = localStorage.getItem(oldKey);
      sessionStorage.setItem(newKey, oldValue);
      sessionStorage.removeItem(oldKey);
    } else {
      console.log(`Ключ "${oldKey}" не знайдено.`);
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
  }, [navigate, props.name, props.type, dispatch]);

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
              onChange={handleChange}
              className={`texarea fileIconName ${
                props.name.length > 16 && "scroll-container"
              }`}
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
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default memo(FileIcon);
