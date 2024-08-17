import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import DoneIcon from "../../../../assetModules/svgs/doneIcon";

const Table = () => {
  const isEditable = useSelector((state) => state.isEditable.value);
  const location = useLocation();
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);
  const [table, setTable] = useLocalStorage(typeName, []);

  // useEffect(() => {
    
  //   if (isEditable) {
  //     const newTable = table.map((row) => [...row, ""]);
  //     newTable.push(new Array(table[0].length).fill(""));
  //     setTable(newTable);
  //   }
  //   setTable([
  //     ["", "id", "vddfg"],
  //     ["footbal", false, true],
  //     ["hghfgh", true, true],
  //     ["gfdgfd", false, true],
  //   ]);
  // }, [isEditable]);

  const changeTd = useCallback((e, index, i) => {
    const newTable = [...table];
    newTable[index][i] = e.target.value;
    setTable(newTable);
  });
  const changeDone=useCallback((e,index,i,td)=>{
    const newTable = [...table];
    newTable[index][i] = !td
    setTable(newTable);
  })

  return (
    <div className="table">
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {table.map((item, index) => (
            <tr key={index}>
              {item.map((td, i) => {
                if (i !== 0 && index !== 0)
                  return (
                    <td key={i}  onClick={(e)=>{if(isEditable) changeDone(e,index,i,td)}}>
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