/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import Circle from "../../../../assetModules/noSvg/circle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Todo = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  const typeName = location.pathname.split("/").slice(2).join("/");
  const [data, setData] = useState([]);
  const updateLocalStorage = (newData, typeName) => {
    localStorage.setItem(typeName, JSON.stringify(newData));
  };
  useEffect(() => {
    if (isEditable) {
      const newData = [...data, ""];
      setData(newData);
      // updateLocalStorage(newData);
    } else {
      const newData = data
        .map((todo) => todo.trim())
        .filter((todo) => todo !== "");
      setData(newData);
      updateLocalStorage(newData);
    }
  }, [isEditable, typeName]);

  useEffect(() => {
    const savedData = localStorage.getItem(typeName);
    if (savedData) {
      setData(JSON.parse(localStorage.getItem(typeName)));
    } else {
      setData([""]);
    }
  }, []);

  const handleDelete = useCallback(
    (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      updateLocalStorage(newData);
    },
    [data, setData, typeName]
  );

  const handleTextChange = useCallback(
    (e, i) => {
      const newTodo = [...data];
      newTodo[i] = e.target.value;
      setData(newTodo);
      updateLocalStorage(newTodo);

      if (
        newTodo[i].trim() !== "" &&
        !newTodo.some((todo) => todo.trim() === "")
      ) {
        setData((prevData) => {
          const updatedData = [...prevData, ""];
          updateLocalStorage(updatedData);
          return updatedData;
        });
      }
    },
    [data, setData]
  );

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
                <div onClick={() =>{if(todo) handleDelete(index)}}>
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
