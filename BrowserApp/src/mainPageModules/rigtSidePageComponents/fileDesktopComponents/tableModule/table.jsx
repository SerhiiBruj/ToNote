import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";

const Table = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const showExpo = useSelector((state) => state.showExpo.value);
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);
  const [table, setTable] = useLocalStorage(typeName, [
    ["", ""],
    ["", ""],
  ]);

  const changeTd = useCallback(
    (e, index, i) => {
      const newTable = [...table];
      newTable[index][i] = e.target.value;
      setTable(newTable);
    },
    [table, setTable]
  );

  const changeDone = useCallback(
    (index, i) => {
      const newTable = [...table];
      newTable[index][i] = table[index][i] === false ? true : false;
      setTable(newTable);
    },
    [table, setTable]
  );

  const addRow = useCallback(() => {
    const newTable = [...table];
    newTable.push(new Array(newTable[0].length).fill(""));
    setTable(newTable);
  }, [table]);

  const addColumn = useCallback(() => {
    const newTable = table.map((item) => [...item, ""]);
    setTable(newTable);
  }, [table]);

  useEffect(() => {
    if (!isEditable && table.length > 2) {
      let newTable = table.filter((row) =>
        row.some(
          (item) =>
            item === true || (typeof item === "string" && item.trim() !== "")
        )
      );
      const columnIndexesToKeep = new Set();
      for (let i = 0; i < (newTable[0] || []).length; i++) {
        let keepColumn = false;
        for (let j = 0; j < newTable.length; j++) {
          if (
            newTable[j][i] === true ||
            (newTable[j][i] && newTable[j][i].trim() !== "")
          ) {
            keepColumn = true;
            break;
          }
        }
        if (keepColumn) columnIndexesToKeep.add(i);
      }
      newTable = newTable.map((row) =>
        row.filter((_, index) => columnIndexesToKeep.has(index))
      );
      setTable(newTable);
    }
    console.log("table");
  }, [isEditable]);

  return (
    <>
      <div
        className="conteiner fileConteiner"
        style={{ display: "flex" }}
        onClick={(e) => {
          if (showExpo || isEditable) e.stopPropagation();
        }}
      >
        <div
          className="table"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {table.map((row, index) => (
            <div key={index} className="tableRow" style={{ display: "flex" }}>
              {row.map((td, i) => {
                if (index === 0 || i === 0) {
                  return (
                    <>
                      {!i && index !== 0 ? (
                        <div
                          key={i * Math.random()}
                          className="line"
                          style={{
                            transform: ` scaleX(${
                              row.length * 2.3
                            }) rotate(-90deg)`,
                          }}
                        ></div>
                      ) : !index && i !== 0 ? (
                        <div
                          key={index * Math.random()}
                          className="line"
                          style={{
                            transform: ` scaleY(${table.length * 1.1}) `,
                          }}
                        ></div>
                      ) : null}
                      <div key={i} className="tableCell">
                        <textarea
                          className="texarea talbetextarea"
                          onChange={(e) => changeTd(e, index, i)}
                          value={ !(index === 0 && i === 0)?td:typeName.split('/')[1]}
                          name="head"
                          disabled={!isEditable || (index === 0 && i === 0)}
                        />
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      onClick={() => isEditable && changeDone(index, i)}
                      key={index * Math.random()}
                      className="tableCell"
                      style={{
                        cursor: isEditable ? "pointer" : "default",
                        marginLeft: `${(i * 1) / 1.85}px`,
                      }}
                    >
                      {td && <DoneIcon />}
                    </div>
                  );
                }
              })}
            </div>
          ))}
          <div onClick={isEditable && addRow}>
            <CrissCrossIcon
              size={0.5}
              color={isEditable ? "#7a7c7c" : "#484848"}
            />
          </div>
        </div>
        <div onClick={isEditable && addColumn}>
          <CrissCrossIcon
            size={0.5}
            color={isEditable ? "#7a7c7c" : "#484848 "}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
