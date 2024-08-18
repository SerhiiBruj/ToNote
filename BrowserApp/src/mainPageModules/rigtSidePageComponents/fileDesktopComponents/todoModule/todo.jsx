/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import Circle from "../../../../assetModules/noSvg/circle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Todo = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);
  const [data, setData] = useLocalStorage(typeName, []);
  const updateLocalStorage = (newData, typeName) => {
    localStorage.setItem(typeName, JSON.stringify(newData));
  };

  useEffect(() => {
    if (isEditable) {
      const newData = [...data, ""];
      setData(newData);
      updateLocalStorage(newData, typeName); 
    } else {
      const newData = data
        .map((todo) => todo.trim())
        .filter((todo) => todo !== "");
      setData(newData);
      updateLocalStorage(newData, typeName); 
    }
  }, [isEditable, typeName]);

  const handleDelete = useCallback(
    (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
      updateLocalStorage(newData, typeName); 
    },
    [data, setData, typeName]
  );

  const handleTextChange = useCallback(
    (e, i) => {
      const newTodo = [...data];
      newTodo[i] = e.target.value;
      setData(newTodo);
      updateLocalStorage(newTodo, typeName); 

      if (
        newTodo[i].trim() !== "" &&
        !newTodo.some((todo) => todo.trim() === "")
      ) {
        setData((prevData) => {
          const updatedData = [...prevData, ""];
          updateLocalStorage(updatedData, typeName);
          return updatedData;
        });
      }
    },
    [data, setData, typeName]
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
                <div
                  onClick={() => {
                    if (todo) handleDelete(index);
                  }}
                >
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
