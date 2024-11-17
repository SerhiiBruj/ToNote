import { useEffect, useCallback, memo,  } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import {  useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import Circle from "../../../../assetModules/noSvg/circle";

const ChecklistModule = () => {
  const { name } = useParams();
  const [checklists, setChecklists] = useLocalStorage(`checklist/${name}`, []);
  const isEditable = useSelector((state) => state.isEditable.value);
  const navivgate = useNavigate();

  const addRemoveLists = () => {
    if (!isEditable) {
      const correctedData = structuredClone(checklists)
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
      if (
        checklists.length !== correctedData.length ||
        checklists.some(
          (list, i) => list.desc.length !== checklists[i].desc.length
        )
      ) {
        setChecklists(correctedData);
      }
    } else {
      const newData = structuredClone(checklists);
      newData.forEach((checklist) => {
        if (!checklist.desc.some((li) => li.value === "")) {
          checklist.desc.push({ value: "", done: false });
        }
      });

      if (!newData.some((li) => li.p === "")) {
        newData.push({
          p: "",
          desc: [{ value: "", done: false }],
        });
      }
      setChecklists(newData);
    }
  };


  useEffect(() => {
   addRemoveLists();
  }, [isEditable]);


  const handleDelete = useCallback(
    (index) => {
      const newData = checklists.filter((_, i) => i !== index);
      setChecklists(newData);
    },
    [checklists, name, setChecklists, navivgate]
  );

  const handleToggleDone = useCallback(
    (index, i) => {
      const newData = checklists.map((item, idx) => {
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
      setChecklists(newData);
    },
    [checklists, name, setChecklists, navivgate]
  );

  const handleChangeDesc = useCallback(
    (e, index, i) => {
      const newData = structuredClone(checklists).map((item, idx) => {
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
      if (!newData[index].desc.some((li) => li.value.trim() === "")) {
        newData[index].desc.push({ value: "", done: false });
      }
      setChecklists(newData);
    },
    [checklists, name, setChecklists, navivgate]
  );

  const handleChangeP = useCallback(
    (e, index) => {
      const newData = structuredClone(checklists).map((item, idx) =>
        idx === index ? { ...item, p: e.target.value } : item
      );
      if (!newData.some((li) => li.p.trim() === "")) {
        newData.push({ p: "", desc: [{ value: "", done: false }] });
      }
      setChecklists(newData);
    },
    [checklists, name, setChecklists, navivgate]
  );

  return (
    <div
      className="checkList conteiner fileConteiner"
      onClick={(e) => isEditable && e.stopPropagation()}
    >
      {checklists.map((checklist, index) => (
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
