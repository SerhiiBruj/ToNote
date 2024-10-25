import { memo, useCallback, useEffect, useMemo } from "react";
import BinIcon from "../../../../assetModules/svgs/bin";
import BellsIcon from "../../../../assetModules/svgs/bellsIcon";
import Circle from "../../../../assetModules/noSvg/circle";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";

const Todo = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);
  const location = useLocation();
  const typeName = useMemo(
    () => location.pathname.split("/").slice(2).join("/"),
    [location.pathname]
  );

  const [data, setData] = useLocalStorage(typeName, [""]);

  useEffect(() => {
    if (isEditable) {
      const newData = [...data, ""];
      setData(newData);
    } else if (data.length > 1) {
      const newData = data
        .map((todo) => todo.trim())
        .filter((todo) => todo !== "");
      setData(newData);
    }
  }, [isEditable]);

  const handleDelete = useCallback(
    (index) => {
      const newData = data.filter((_, i) => i !== index);
      setData(newData);
    },
    [data, setData, typeName]
  );

  const handleTextChange = useCallback(
    (e, i) => {
      const newTodo = [...data];
      newTodo[i] = e.target.value;
      setData(newTodo);

      if (
        newTodo[i].trim() !== "" &&
        !newTodo.some((todo) => todo.trim() === "")
      ) {
        setData((prevData) => {
          const updatedData = [...prevData, ""];
          return updatedData;
        });
      }
    },
    [data, setData, typeName]
  );

  return (
    <div
      className="todo conteiner fileConteiner "
      onClick={(e) => {
        if (showExpo || isEditable) e.stopPropagation();
      }}
    >
      <ol className="todoListCont">
        {data.map((todo, index) => (
          <li className="li" key={index}>
            <div
              className="divdiv"
              style={{
                width: "80%",
              }}
            >
              <Circle size={30} color={"#bfbfbf"} />
              <textarea
              onTouchStart={(e)=>e.stopPropagation()}
                className="texarea"
                disabled={!isEditable}
                value={todo}
                onChange={(event) => handleTextChange(event, index)}
                rows="1"
                cols="50"
              />
            </div>
            <div className="divindiv">
              <div>
                <BellsIcon size={window.innerWidth>480? 1.5:0.8} />
              </div>
              <div onClick={() => handleDelete(index)}>
                <BinIcon size={window.innerWidth>480? 1:0.5} color={"#bfbfbf"} />
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default memo(Todo);
