/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import Circle from "../../../../assetModules/noSvg/circle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Todo = () => {
  const [data, setData] = useState([]);
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  let typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    if (localStorage.getItem(typeName)) {
      let savedData = localStorage.getItem(typeName);
      setData(JSON.parse(savedData));
    }
  }, [typeName]);

  
  useEffect(() => {
    if (isEditable) {
      const newData = [...data, ""];
      setData(newData);
      localStorage.setItem(typeName,newData)
    } else {
      const newData = data
        .map((todo) => (todo.trim() ? todo : null)) 
        .filter(Boolean); 
  
      setData(newData);
      localStorage.setItem(typeName,newData)
    }
  }, [isEditable]);
  

  const handleDelete = useCallback((index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  });

  const handleTextChange = useCallback((e, i) => {
    let newTodo = [...data];
    newTodo[i] = e.target.value;
    setData(newTodo);
    localStorage.setItem(typeName, JSON.stringify(newTodo));
    e.target.value = "";
  });

  return (
    <div className="todo">
      <ol>
        <>
          {data.map((todo, index) => (
            <li className="li" key={index}>
              <div className="divdiv">
                <Circle size={30} color={"#bfbfbf"} />
                <textarea
                  className="texarea"
                  disabled={isEditable ? false : true}
                  value={todo}
                  onChange={(event) => handleTextChange(event, index)}
                  rows="1"
                  cols="50"
                />
              </div>
              <div className="divindiv">
                <div>
                  <BellsIcon size={1.5} />
                </div>
                <div onClick={() => handleDelete(index)}>
                  <BinIcon size={1} color={"#bfbfbf"} />
                </div>
              </div>
            </li>
          ))}
        </>
      </ol>
    </div>
  );
};

export default Todo;
