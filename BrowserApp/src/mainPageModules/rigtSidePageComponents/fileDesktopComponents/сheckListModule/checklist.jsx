/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useCallback, useMemo } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import Circle from "../../../../assetModules/noSvg/circle";

const urlRegex = /(https?:\/\/[^\s]+)/g;

const ChecklistModule = () => {
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);

  const [data, setData] = useLocalStorage(typeName, []);
  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);

  useEffect(() => {
    if (!isEditable) {
      const correctedData = data.map((checklist) => ({
        ...checklist,
        // Preserve object structure, only trim the `value` field
        desc: checklist.desc
          .map((li) => ({
            ...li,
            value: li.value?.trim(),
          }))
          .filter((li) => li.value !== ""), // Filter out objects with empty `value`
      }));

      // Filter out checklists where `p` is empty and `desc` has no items
      const corrected = correctedData.filter(
        (checklist) => checklist.p.trim() !== "" && checklist.desc.length > 0
      );

      setData(corrected); // Update data with the cleaned version
    } else {
      // If editable, add an empty description object if it doesn't exist already
      const newData = data.map((checklist) => ({
        ...checklist,
        desc: [...checklist.desc, { value: "", done: false }],
      }));

      // Add an empty checklist object if none exists
      newData.push({
        p: "",
        desc: [{ value: "", done: false }],
      });

      setData(newData); // Set data to the new state
    }
  }, [isEditable]);

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
          // if (!item.desc[i].includes("\n")) {
          //   return {
          //     ...item,
          //     desc: [
          //       ...item.desc.slice(0, i),
          //       ...e.target.value.split("\n"),
          //       ...item.desc.slice(i + 1),
          //     ],
          //   };
          // }
          return {
            ...item,
            desc: item.desc.map((desc, descIdx) => {
              if (descIdx === i) {
                return { ...desc, value: e.target.value }; // Return the updated value
              }
              return desc; // Return the original value if it's not the one being edited
            }),
          };
        }
        return item;
      });
      if (!newData[index].desc.some((li) => li.value.trim() === "")) {
        newData[index].desc.push({ value: "", done: false });
      }
      updateData(newData);
    },
    [data, updateData]
  );
  const handleToggleDone = (index, i) => {
    const newData = data.map((item, idx) => {
      if (idx === index) {
        return {
          ...item,
          desc: item.desc.map((desc, descIdx) => {
            if (descIdx === i) {
              return { ...desc, done: !desc.done }; // Toggle the `done` status
            }
            return desc; // Return the original object if it's not being toggled
          }),
        };
      }
      return item; // Return the original checklist item if it's not the one being updated
    });
    updateData(newData); // Update the state with the new data
  };
  const handleChangeP = useCallback(
    (e, index) => {
      const newData = data.map((item, idx) => {
        if (idx === index) {
          return { ...item, p: e.target.value };
        }
        return item;
      });
      if (!newData.some((li) => li.p.trim() === "")) {
        newData.push({ p: "", desc: [{ value: "", done: false }] });
      }
      updateData(newData);
    },
    [data, updateData]
  );

  const renderTextWithLinks = useCallback((text) => {
    console.log(text);
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
      onClick={(e) => {
        if (showExpo || isEditable) e.stopPropagation();
      }}
    >
      {data.map((checklist, index) => (
        <ul key={index} className="checkLisList">
          <div
            className="spbtw"
            style={{
              borderBottom: !checklist.p && "5px solid gray",
            }}
          >
            <textarea
              onChange={(e) => handleChangeP(e, index)}
              className={`caption texarea ${
                checklist.p ? "with-after" : "noafter"
              }`}
              placeholder="Type in"
              disabled={!isEditable}
              value={checklist.p}
              style={{
                padding: 10,
                height: 50,
                margin: 0,
              }}
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
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div
                      style={{
                        transform: "translate(-20px)",
                      }}
                    >
                      <Circle size={20} color={"#bfbfbf"} />
                    </div>

                    <input
                      value={li.value}
                      disabled={!isEditable}
                      onChange={(e) => handleChangeDesc(e, index, idx)}
                      className="texarea checkLi"
                      style={{
                        borderBottom: !li.value && "5px solid gray",
                        padding: 5,
                        height: 30,
                        margin: 0,
                      }}
                    />
                  </div>
                  <div
                    onClick={() => handleToggleDone(index, idx)}
                    style={{
                      opacity: li.done ? 1 : 0.5,
                    }}
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
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ transform: "translate(-20px)" }}>
                        <Circle size={20} color={"#bfbfbf"} />
                      </div>
                      <div
                        className={`texarea checkLi `}
                        style={{
                          borderBottom: !li && "5px solid gray",
                          padding: 5,
                          height: 30,
                          margin: 0,
                        }}
                      >
                        {renderTextWithLinks(li.value)}
                      </div>
                    </div>
                    <div
                      onClick={() => handleToggleDone(index, idx)}
                      style={{
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
        </ul>
      ))}
    </div>
  );
};

export default ChecklistModule;
