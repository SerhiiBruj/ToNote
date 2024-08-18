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
    ["",""],
    ["",''],
  ]);

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



  const changeTd = useCallback((e, index, i) => {
    const newTable = [...table];
    newTable[index][i] = e.target.value;
    setTable(newTable);
  });
  const changeDone = useCallback((e, index, i, td) => {
    const newTable = [...table];
    newTable[index][i] = !td;
    setTable(newTable);
  });

  return (
    <div className="table">
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              {item.map((td, i) => {
                if (i !== 0 && index !== 0)
                  return (
                    <td
                      key={i}
                      onClick={(e) => {
                        if (isEditable) changeDone(e, index, i, td);
                      }}
                    >
                      <div className="td">{td && <DoneIcon />}</div>
                    </td>
                  );
                else
                  return (
                    <td key={i}>
                      <div className="td">
                        <textarea
                          className="texarea"
                          disabled={!isEditable}
                          onChange={(e) => changeTd(e, index, i)}
                          value={td}
                        />
                      </div>
                    </td>
                  );
              })}
            
            </tr>
            
          ))}
          <tr>
              <td>
               <CrissCrossIcon size={0.5}/>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
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
