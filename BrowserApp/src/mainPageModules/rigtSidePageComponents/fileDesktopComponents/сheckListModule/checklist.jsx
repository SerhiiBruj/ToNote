import React, { useState, useEffect } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import PenIcon from "../../../../assetModules/svgs/pen";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ChecklistModule = () => {
  const [data, setData] = useState([]);
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  let typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    const savedData = localStorage.getItem(typeName);

    if (savedData) {
      let lists = JSON.parse(savedData);
      lists = lists.map((item) => {
        item.p = item.p.trim();
        item.desc = item.desc.filter((desc) => desc.trim() !== "");
        return item;
      });
      setData(lists);
    }
  }, [typeName]);

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };
  const handleChangeDesc = (e, index, i) => {
    const newText = [...data];
    newText[index].desc[i] = e.target.value;
    setData(newText);
    localStorage.setItem(typeName, JSON.stringify(newText));
  };


  return (
    <div className="checkList">
      {!isEditable ? (
        <>
          {data.map((checklist, index) => (
            <ul key={index} className="checkLisList">
              <div className="spbtw">
                <h3 className="caption">{checklist.p}</h3>
                <div style={{ display: "flex" }}>
                  <BellsIcon size={1.2} />
                  <div onClick={() => handleDelete(index)}>
                    <BinIcon size={0.8} color={"#bfbfbf"} />
                  </div>
                </div>
              </div>
              {checklist.desc.map((li, idx) => (
                <li className="checkLi" key={idx}>
                  {li}
                </li>
              ))}
            </ul>
          ))}
        </>
      ) : (
        <>
          {data.map((checklist, index) => (
            <ul key={index} className="checkLisList">
              <div className="spbtw">
                <textarea
                  className="caption texarea"
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
                <li
                  className="checkLi"
                  style={{
                    padding: 0,
                    height: 25,
                    marginBlockStart: 0,
                    marginBlockEnd: 0,
                    marginInlineStart: 0,
                    marginInlineEnd: 0,
                  }}
                  key={idx}
                >
                  <textarea
                    onChange ={(e)=>handleChangeDesc(e,index,idx)}
                    value={li}
                    className="texarea checkLi"
                  />
                </li>
              ))}
            </ul>
          ))}
          <ul className="checkLisList">
            <div className="spbtw">
              <h3 className="caption">Something</h3>
              <div style={{ display: "flex" }}>
                <BellsIcon size={1.2} />
                <div onClick={() => handleDelete(index)}>
                  <BinIcon size={0.8} color={"#bfbfbf"} />
                </div>
              </div>
            </div>
            <li className="checkLi">Something</li>
          </ul>
        </>
      )}
    </div>
  );
};

export default ChecklistModule;
