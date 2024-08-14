import { useState, useEffect } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ChecklistModule = () => {
  const [data, setData] = useState([]);
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  const typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    const savedData = localStorage.getItem(typeName);

    if (savedData) {
      const lists = JSON.parse(savedData).map((item) => ({
        ...item,
        p: item.p.trim(),
        desc: item.desc.filter((desc) => desc.trim() !== ""),
      }));
      setData(lists);
    }
  }, [typeName]);

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };

  const handleChangeDesc = (e, index, i) => {
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
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };


  const handleChangeAddNewDesc = (e, index) => {
    const newData = data.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          desc: [...item.desc, e.target.value]
        };
      }
      return item;
    });
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };
  


  const handleChangeP = (e, index) => {
    const newData = data.map((item, idx) => {
      if (idx === index) {
        return { ...item, p: e.target.value };
      }
      return item;
    });
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };

  const handleAddNewChecklistItem = (e) => {
    const newChecklistItem = { p: e.target.value, desc: [""] };
    setData([...data, newChecklistItem]);
    e.target.value = ""; // Очистка значення textarea
  };

  return (
    <div className="checkList">
      {data.map((checklist, index) => (
        <ul key={index} className="checkLisList">
          <div className="spbtw">
            <textarea
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
          {isEditable&&<li className="checkLi">
              <textarea
                disabled={!isEditable}
                onChange={(e,index) => handleChangeAddNewDesc(e,index)}
                className="texarea checkLi"
                style={{
                  padding: 0,
                  height: 25,
                  margin: 0,
                }}
              />
            </li>}
        </ul>
      ))}
      {isEditable ? (
        <ul>
          <div className="spbtw">
            <textarea
              onChange={(event) => handleAddNewChecklistItem(event)}
              className="caption texarea"
              disabled={!isEditable}
              style={{
                boxShadow: "inset gray 10px -18px 0px -10px",
              }}
            />

            <div style={{ display: "flex" }}>
              <BellsIcon size={1.2} />
              <div>
                <BinIcon size={0.8} color={"#bfbfbf"} />
              </div>
            </div>
          </div>
          <li className="checkLi">
            <textarea
              disabled={!isEditable}
              className="texarea checkLi"
              style={{
                padding: 0,
                height: 25,
                margin: 0,
                boxShadow: "gray -20px 18px 0px -10px",
              }}
            />
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export default ChecklistModule;
