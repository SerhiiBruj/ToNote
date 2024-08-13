import React, { useEffect, useRef, useState } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import Circle from "../../../../assetModules/noSvg/circle";
import isEditable from "../../../../redux/isEditable";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const Todo = () => {
  const [data, setData] = useState([]);
  const isEditable = useSelector((state) => state.isEditable.value);
  const textAreaRefs = useRef([]);
  const ref = useRef();
  const location = useLocation();
  let typeName = location.pathname.split("/").slice(2).join("/");

  useEffect(() => {
    ref.current.style.opacity = 0;
    ref.current.style.transition = "opacity 5s ease";
    ref.current.style.opacity = 1;

    if (localStorage.getItem(typeName)) {
      let savedData = localStorage.getItem(typeName);
      setData(JSON.parse(savedData));
    }
  }, []);
  useEffect(() => {
    if (isEditable) {
      const lastIndex = textAreaRefs.current.length - 1;
      textAreaRefs.current[lastIndex]?.focus();
    }
  }, [isEditable, data]);

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem(typeName, JSON.stringify(newData));
  };

  const handleTextChange = (e, i) => {
    let newTodo = [...data];
    newTodo[i] = e.target.value;
    setData(newTodo);
    localStorage.setItem(typeName, JSON.stringify(newTodo));
    e.target.value = "";
  };
  const handleTextNew = (e) => {
    let newTodo = e.target.value;
    let newTodoArray = [...data, newTodo];
    setData(newTodoArray);
    e.target.value = "";
  };
  return (
    <div className="todo" ref={ref}>
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
                  autoFocus
                  rows="1"
                  cols="50"
                  ref={(el) => (textAreaRefs.current[index] = el)}
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
          {isEditable && (
            <div className="li">
              <div className="divdiv">
                <Circle size={30} color={"#bfbfbf"} />
                <textarea
                  className=" texarea "
                  onChange={(event) => handleTextNew(event)}
                  autoFocus
                  rows="1"
                  cols="50"
                />
              </div>
            </div>
          )}
        </>
      </ol>
    </div>
  );
};

export default Todo;
