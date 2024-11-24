import React, { memo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";

const Table = () => {
  const isEditable = useSelector((state) => state.isEditable.value);

  const [table, setTable] = useLocalStorage("table/", [
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
      newTable[index][i] =
        table[index][i] === false || table[index][i] === "" ? true : false;
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
          if (isEditable) e.stopPropagation();
        }}
      >
        <div
          className="table"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {table.map((row, index) => (
            <div
              key={`row-${1987}-${index}`}
              className="tableRow"
              style={{ display: "flex" }}
            >
              {row.map((td, i) => {
                const uniqueKey = `cell-${index}-${i}`;
                if (index === 0 || i === 0) {
                  return (
                    <React.Fragment key={`fragment-${index}-${i}`}>
                      {!i && index !== 0 ? (
                        <div
                          key={`line-h-${i}-${index + 200}`}
                          className="line"
                          style={{
                            transform: ` scaleX(${
                              row.length * 2.3
                            }) rotate(-90deg)`,
                          }}
                        ></div>
                      ) : !index && i !== 0 ? (
                        <div
                          key={`line-v-${i}-${index + 300}`}
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
                          value={td}
                          name="head"
                          disabled={!isEditable || (index === 0 && i === 0)}
                        />
                      </div>
                    </React.Fragment>
                  );
                } else {
                  return (
                    <div
                      onClick={() => {
                        if (isEditable) changeDone(index, i);
                      }}
                      key={uniqueKey}
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
          <div
            onClick={() => {
              isEditable && addRow();
            }}
            style={{ height: "fit-content", width: "fit-content" }}
          >
            <CrissCrossIcon
              size={0.05}
              color={isEditable ? "#7a7c7c" : "#484848"}
            />
          </div>
        </div>
        <div
          onClick={() => {
            isEditable && addColumn();
          }}
          style={{ height: "fit-content", width: "fit-content" }}
        >
          <CrissCrossIcon
            size={0.05}
            color={isEditable ? "#7a7c7c" : "#484848"}
          />
        </div>
      </div>
    </>
  );
};

export default memo(Table);
