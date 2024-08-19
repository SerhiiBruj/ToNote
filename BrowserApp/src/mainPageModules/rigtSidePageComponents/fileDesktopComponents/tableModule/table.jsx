import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";

const Table = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
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
      newTable[index][i] = !table[index][i];
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
  return (
    <>
      <div className="conteiner" style={{ display: "flex" }}>
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
                          className="line"
                          style={{
                            transform: ` scaleX(${
                              row.length * 2.3
                            }) rotate(-90deg)`,
                          }}
                        ></div>
                      ) : !index && i !== 0 ? (
                        <div
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
                          disabled={!isEditable}
                        />
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div
                      onClick={() => isEditable && changeDone(index, i)}
                      key={i}
                      className="tableCell"
                    >
                      {td && <DoneIcon />}
                    </div>
                  );
                }
              })}
            </div>
          ))}
          <div onClick={isEditable && addRow}>
            <CrissCrossIcon size={0.5} />
          </div>
        </div>
        <div onClick={isEditable && addColumn}>
          <CrissCrossIcon size={0.5} />
        </div>
      </div>
    </>
  );
};

export default Table;

// import * as XLSX from "xlsx";

// const exportToExcel = () => {
//   // Додаємо заголовки
//   const ws = XLSX.utils.aoa_to_sheet([["ID", "Ім'я", "Вік"], ...data]);
//   // Створюємо нову книгу
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
//   // Експортуємо файл
//   XLSX.writeFile(wb, "data.xlsx");
// };
{
  /* <button onClick={exportToExcel}>Експортувати в Excel</button> */
}
// const rows = 5;
// const cols = 5;

// const array = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));

// console.log(array);

// useEffect(() => {
//   if (isEditable) {
//     const newTable = table.map((row) => [...row, ""]); // Додаємо порожню колонку
//     newTable.push(new Array(newTable[0].length).fill("")); // Додаємо порожній рядок
//     setTable(newTable);
//   } else {

//     let newTable = [...table];

//     if (newTable[newTable.length - 1].every((cell) => cell.trim() === "")) {
//       newTable.pop();
//     }

//     newTable = newTable.filter(row => row[0].trim() !== "");

//     // Видаляємо стовпець, якщо перший елемент у кожному рядку порожній
//     if (newTable.length > 0 && newTable.every(row => row[0].trim() === "")) {
//       newTable = newTable.map(row => row.slice(1));
//     }

//     // Видаляємо останню колонку, якщо вона порожня
//     const columnIndexToDelete = newTable[0].length - 1;
//     if (newTable.every((row) => row[columnIndexToDelete].trim() === "")) {
//       newTable = newTable.map((row) => row.slice(0, -1));
//     }

//     setTable(newTable);
//   }
// }, [isEditable]);

// const changeTd = useCallback((e, index, i) => {
//   const newTable = [...table];
//   newTable[index][i] = e.target.value;
//   setTable(newTable);
// });
// const changeDone = useCallback((e, index, i, td) => {
//   const newTable = [...table];
//   newTable[index][i] = !td;
//   setTable(newTable);
// });
