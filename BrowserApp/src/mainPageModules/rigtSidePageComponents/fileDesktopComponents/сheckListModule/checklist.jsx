import { useEffect, useRef, useCallback, useMemo } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";

/**
 * Checklist module component for managing checklist items.
 * Manages adding, deleting, and updating checklist items and their descriptions.
 * Uses local storage to persist checklist data.
 * @returns {JSX.Element} Checklist module component
 */

const ChecklistModule = () => {
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);

  const [data, setData] = useLocalStorage(typeName, []);
  const isEditable = useSelector((state) => state.isEditable.value);

  const textareaRefs = useRef([]);

  useEffect(() => {
    if (!isEditable) {
      const correctedData = data.map((checklist) => ({
        ...checklist,
        desc: checklist.desc
          .map((li) => li.trim())
          .filter((desc) => desc !== ""),
      }));
      let corected = correctedData.filter((checklist) => {
        if(checklist.p !== ""&&checklist.desc[0] !== "") return checklist
      });
      setData(corected);
    } else {
      const newData = data.map((checklist) => ({
        ...checklist,
        desc: [...checklist.desc, ""],
      }));
      newData.push({
        p: "",
        desc: [""],
      });
      setData(newData);
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
          return {
            ...item,
            desc: item.desc.map((desc, descIdx) =>
              descIdx === i ? e.target.value : desc
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
      const newData = data.map((item, idx) => {
        if (idx === index) {
          return { ...item, p: e.target.value };
        }
        return item;
      });
      updateData(newData);
    },
    [data, updateData]
  );

  return (
    <div className="checkList">
      {data.map((checklist, index) => (
        <ul key={index} className="checkLisList">
          <div className="spbtw">
            <textarea
              ref={(el) => (textareaRefs.current[index * 100] = el)}
              onChange={(e) => handleChangeP(e, index)}
              className="caption texarea"
              disabled={!isEditable}
              value={checklist.p}
            />
            <div style={{ display: "flex" }}>
              <BellsIcon size={1.2} />
              <div onClick={() => handleDelete(index)}>
                <BinIcon size={0.8} color={"#bfbfbf"} />
              </div>
            </div>
          </div>
          {checklist.desc.map((li, idx) => (
            <li key={idx} className="checkLi">
              <textarea
                ref={(el) => (textareaRefs.current[index * 100 + idx + 1] = el)}
                value={li}
                disabled={!isEditable}
                onChange={(e) => handleChangeDesc(e, index, idx)}
                className="texarea checkLi"
                style={{
                  padding: 0,
                  height: 25,
                  margin: 0,
                }}
              />
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ChecklistModule;
