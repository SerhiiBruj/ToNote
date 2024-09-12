import { useEffect, useMemo, useRef } from "react";
import AddClocker from "./components/Addclocker";
import { useLocation } from "react-router-dom";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import ClockOn from "./components/ClockOn";
import CheckIn from "./components/CheckIn";
import Counter from "./components/Counter";
import Timer from "./components/Timer";
import { useDispatch, useSelector } from "react-redux";
import { updateisTable } from "../../../../redux/istable";

const Dashboard = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ref = useRef();

  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);

  const isTable = useSelector((state) => state.isTable.value);

  const [clockers, setClockers] = useLocalStorage(typeName, {
    templates: [],
    table: [],
  });

  const tableToRender = useMemo(() => {
    console.log(isTable);
    return [["", ...clockers.templates], ...clockers.table];
  }, [clockers.templates, clockers.table]);

  useEffect(() => {
    if (isTable) dispatch(updateisTable(false));
  }, [location.pathname]);

  function getDatesArray(startDate) {
    const datesArray = [];
    const [day, month, year] = startDate.split(".").map(Number);
    let date = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    while (date < currentDate) {
      date.setDate(date.getDate() + 1);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Fixing the month format
      const year = date.getFullYear();
      datesArray.push(`${day}.${month}.${year}`);
    }

    return datesArray;
  }

  useEffect(() => {
    const lastDate = clockers.table[clockers.table.length - 1]?.[0]; // Отримуємо останню дату з таблиці
    if (lastDate) {
      const dates = getDatesArray(lastDate); // Генеруємо масив нових дат
      if (dates.length > 0) {
        const updatedTable = [...clockers.table]; // Створюємо копію таблиці
        dates.forEach((date) => {
          let arr = []; // Створюємо новий рядок для додавання у таблицю
          // Генеруємо значення для кожної колонки на основі шаблону
          clockers.templates.forEach((template) => {
            switch (template.type) {
              case "clock on":
                arr.push([]); // Для типу "clock on" додаємо порожній масив
                break;
              case "counter":
                arr.push(0); // Для типу "counter" додаємо 0
                break;
              case "timer":
                arr.push([]); // Для типу "timer" додаємо порожній масив
                break;
              case "check in":
                arr.push(false); // Для типу "check in" додаємо false
                break;
              default:
                arr.push(null); // За замовчуванням додаємо null, якщо тип невідомий
            }
          });
          updatedTable.push([date, ...arr]); // Додаємо новий рядок до таблиці
        });
        setClockers((prevClockers) => ({
          ...prevClockers,
          table: updatedTable,
        })); // Оновлюємо стан
      }
    }
  }, [clockers.table, clockers.templates, setClockers]); // Додаємо точні залежності

  return (
    <>
      {!isTable ? (
        <div className="dashboard fileContainer">
          {clockers.templates.map((clocker, i) => {
            switch (clocker.type) {
              case "timer":
                return (
                  <Timer
                    colors={colors}
                    clockers={clockers}
                    setClockers={setClockers}
                    key={i}
                    i={i + 1}
                  />
                );
              case "counter":
                return (
                  <Counter
                    colors={colors}
                    clockers={clockers}
                    setClockers={setClockers}
                    key={i}
                    i={i + 1}
                  />
                );
              case "clock on":
                return (
                  <ClockOn
                    colors={colors}
                    clockers={clockers}
                    setClockers={setClockers}
                    key={i}
                    i={i + 1}
                  />
                );
              case "check in":
                return (
                  <CheckIn
                    clockers={clockers}
                    setClockers={setClockers}
                    key={i}
                    dateOfStart={clocker.dateOfStart}
                    name={clocker.name}
                    results={clocker.results}
                    goal={clocker.goal}
                    table={clockers.table}
                    typeName={typeName}
                    i={i + 1}
                  />
                );
              default:
                return null;
            }
          })}
          <div className="heightCont">
            <AddClocker clockers={clockers} setClockers={setClockers} />
          </div>
        </div>
      ) : (
        <>
          <div
            className="conteiner fileConteiner"
            style={{ display: "flex" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="table"
              ref={ref}
              style={{ display: "flex", flexDirection: "column" }}
            >
              {tableToRender.map((row, index) => (
                <div
                  key={index * 1223}
                  className="tableRow"
                  style={{ display: "flex" }}
                >
                  {row.map((td, i) => {
                    if (index === 0 || i === 0) {
                      return (
                        <>
                          {!i && index !== 0 ? (
                            <div
                              key={i}
                              className="line"
                              style={{
                                transform: ` scaleX(${
                                  row.length * 2.3
                                }) rotate(-90deg)`,
                              }}
                            ></div>
                          ) : !index && i !== 0 ? (
                            <div
                              key={i + 111}
                              className="line"
                              style={{
                                transform: ` scaleY(${tableToRender.length}) `,
                                height: 80,
                              }}
                            ></div>
                          ) : null}
                          <div
                            key={i + 201}
                            className="tableCell"
                            style={{
                              marginLeft: `${(i * 1) / 25}px`,
                            }}
                          >
                            <p
                              style={{
                                textAlign: " center",
                              }}
                            >
                              {index === 0 ? td.fileName : td}
                            </p>
                          </div>
                        </>
                      );
                    } else {
                      return (
                        <div
                          key={i + 301}
                          className="tableCell"
                          style={{
                            marginLeft: 5,
                          }}
                        >
                          {Array.isArray(td)
                            ? typeof td[0] === "object"
                              ? td
                                  .map((item) => {
                                    return `${item.s}-${item.e}`;
                                  })
                                  .join(", ")
                              : td.join(", ")
                            : typeof td === "boolean"
                            ? String(td)
                            : td}
                        </div>
                      );
                    }
                  })}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Dashboard;

let colors = [
  "#f44336",
  "#e91e63",
  "#9c27b0",
  "#673ab7",
  "#3f51b5",
  "#2196f3",
  "#03a9f4",
  "#00bcd4",
  "#009688",
  "#4caf50",
  "#8bc34a",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ff5722",
  "#795548",
  "#9e9e9e",
  "#607d8b",
];
