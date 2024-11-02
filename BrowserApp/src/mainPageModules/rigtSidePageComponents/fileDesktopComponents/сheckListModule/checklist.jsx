import { useEffect, useCallback, useMemo, memo } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import {  useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import Circle from "../../../../assetModules/noSvg/circle";

const urlRegex = /(https?:\/\/[^\s]+)/g;

const ChecklistModule = () => {
  const location = useLocation();

  const typeName = useMemo(
    () => location.pathname.split("/").slice(2).join("/"),
    [location.pathname]
  );

  const [data, setData] = useLocalStorage(typeName, []);

  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);

  // Очистка даних тільки тоді, коли змінюється `isEditable`
  useEffect(() => {
    if (!isEditable) {
      const correctedData = data
        .map((checklist) => ({
          ...checklist,
          desc: checklist.desc
            .map((li) => ({
              ...li,
              value: li.value?.trim(),
            }))
            .filter((li) => li.value !== ""),
        }))
        .filter(
          (checklist) => checklist.p.trim() !== "" && checklist.desc.length > 0
        );

      setData(correctedData);
    } else {
      const newData = [...data];

      // Додавання порожнього опису лише тоді, коли його немає
      newData.forEach((checklist) => {
        if (!checklist.desc.some((li) => li.value === "")) {
          checklist.desc.push({ value: "", done: false });
        }
      });

      // Додавання порожнього елементу, якщо його немає
      if (!newData.some((li) => li.p === "")) {
        newData.push({
          p: "",
          desc: [{ value: "", done: false }],
        });
      }

      setData(newData);
    }
  }, [isEditable]);

  // Використання useCallback для запобігання перерендеру
  const updateData = useCallback(
    (newData) => {
      setData(newData);
    },
    [setData]
  );

  const handleDelete = useCallback(
    (index) => {
      const newData = data.filter((_, i) => i !== index);
      updateData(newData);
    },
    [data, updateData]
  );

  const handleChangeDesc = useCallback(
    (e, index, i) => {
      const newData = data.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            desc: item.desc.map((desc, descIdx) =>
              descIdx === i ? { ...desc, value: e.target.value } : desc
            ),
          };
        }
        return item;
      });

      // Перевірка, чи є порожні значення, перед додаванням
      if (!newData[index].desc.some((li) => li.value.trim() === "")) {
        newData[index].desc.push({ value: "", done: false });
      }

      updateData(newData);
    },
    [data, updateData]
  );

  const handleToggleDone = useCallback(
    (index, i) => {
      const newData = data.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            desc: item.desc.map((desc, descIdx) =>
              descIdx === i ? { ...desc, done: !desc.done } : desc
            ),
          };
        }
        return item;
      });

      updateData(newData);
    },
    [data, updateData]
  );

  const handleChangeP = useCallback(
    (e, index) => {
      const newData = data.map((item, idx) =>
        idx === index ? { ...item, p: e.target.value } : item
      );

      // Додавання нового поля, якщо всі заголовки заповнені
      if (!newData.some((li) => li.p.trim() === "")) {
        newData.push({ p: "", desc: [{ value: "", done: false }] });
      }

      updateData(newData);
    },
    [data, updateData]
  );

  // Мемоізація функції рендерингу тексту з посиланнями
  const renderTextWithLinks = useCallback((text) => {
    return text.split(urlRegex).map((part, index) =>
      urlRegex.test(part) ? (
        <a
          href={part}
          key={index}
          style={{ color: "inherit", fontSize: 25 }}
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      ) : (
        part
      )
    );
  }, []);

  return (
    <div
      className="checkList conteiner fileConteiner"
      onClick={(e) => (showExpo || isEditable) && e.stopPropagation()}
    >
      {data.map((checklist, index) => (
        <ul key={index} className="checkLisList">
          <div
            className="spbtw"
            style={{ borderBottom: !checklist.p && "5px solid gray" }}
          >
            <textarea
              onChange={(e) => handleChangeP(e, index)}
              className={`caption texarea ${
                checklist.p ? "with-after" : "noafter"
              }`}
              placeholder="Type in"
              disabled={!isEditable}
              value={checklist.p}
              style={{ padding: 10, height: 50, margin: 0 }}
            />
            <div style={{ display: "flex" }}>
              <BellsIcon size={1.2} />
              <div onClick={() => handleDelete(index)}>
                <BinIcon size={0.8} color={"#bfbfbf"} />
              </div>
            </div>
          </div>
          {checklist.desc.map((li, idx) => (
            <li
              key={idx}
              className={`${li.done ? "doned checkLi" : "checkLi"}`}
              style={{ paddingTop: 20 }}
            >
              {isEditable ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                    }}
                  >
                    <div style={{ transform: "translate(-20px)" }}>
                      <Circle size={20} color={"#bfbfbf"} />
                    </div>
                    <textarea
                      value={li.value}
                      disabled={!isEditable}
                      onChange={(e) => handleChangeDesc(e, index, idx)}
                      className="texarea checkLi"
                      style={{
                        borderBottom: !li.value && "5px solid gray",
                        height: "auto",
                        padding: 5,
                        minHeight: 30,
                        margin: 0,
                        width: "100%",
                      }}
                    />
                  </div>
                  <div
                    onClick={() => handleToggleDone(index, idx)}
                    style={{ opacity: li.done ? 1 : 0.5 }}
                  >
                    <DoneIcon />
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        width: "80%",
                      }}
                    >
                      <div style={{ transform: "translate(-20px)" }}>
                        <Circle size={20} color={"#bfbfbf"} />
                      </div>
                      <div
                        className="texarea checkLi"
                        style={{
                          padding: 5,
                          minHeight: 30,
                          margin: 0,
                          width: "90%",
                          maxWidth: "90%",
                          overflowWrap: "anywhere",
                        }}
                      >
                        {renderTextWithLinks(li.value)}
                      </div>
                    </div>
                    <div
                      className="hoverSvg"
                      onClick={() => handleToggleDone(index, idx)}
                      style={{
                        transition: "0.5s all ease",
                        opacity: li.done ? 1 : 0.5,
                      }}
                    >
                      <DoneIcon />
                    </div>
                  </div>
                </div>
              )}
            </li>
          ))}
          <hr
            style={{
              marginTop: 50,
              border: 0,
              width: "100%",
              height: 5,
              backgroundColor: "#bfbfbf",
              opacity: "50%",
            }}
            className="hr"
          />
        </ul>
      ))}
    </div>
  );
};

export default memo(ChecklistModule);
