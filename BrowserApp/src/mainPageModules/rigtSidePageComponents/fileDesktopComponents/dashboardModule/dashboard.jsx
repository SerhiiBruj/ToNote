import { useEffect, useMemo, useRef, useState } from "react";
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
  const typeName = useMemo(() => {
    return location.pathname.split("/").slice(2).join("/");
  }, [location.pathname]);
  const ref = useRef();
  const isTable = useSelector((state) => state.isTable.value);
  const [tableToRender, setTableToRender] = useState([]);
  const [clockers, setClockers] = useLocalStorage(typeName, {
    templates: [],
    table: [],
  });
  const dispath = useDispatch();

  useEffect(() => {
    let tab = JSON.parse(JSON.stringify(clockers.table));
    setTableToRender(tab.unshift(["", ...clockers.templates]));
  }, [isTable]);

  useEffect(() => {
    if (isTable) dispath(updateisTable(false));
  }, [location.pathname]);

  useEffect(() => {
    if (clockers.table.length > 0) {
      const dates = getDatesArray(clockers.table[clockers.table.length - 1][0]);
      if (dates) {
        const newTable = [["", ...clockers.templates], ...clockers.table];
        setTableToRender(newTable);
      }
    }
  }, [isTable]);

  function getDatesArray(startDate) {
    const datesArray = [];
    const [day, month, year] = startDate.split(".").map(Number);
    let date = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    if (
      date.getDate() !== currentDate.getDate() ||
      date.getFullYear() !== currentDate.getFullYear() ||
      date.getMonth() !== currentDate.getMonth()
    )
      while (date <= currentDate) {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth()).padStart(2, "0");
        const year = date.getFullYear();
        datesArray.push(`${day}.${month}.${year}`);
      }
    return datesArray;
  }

  useEffect(() => {
    const dates = getDatesArray(
      clockers.table[clockers.table.length - 1][0]
    ).slice(1);
    if (dates) {
      const arr = [...clockers.table];
      dates.map((date) => {
        arr.push([date, ...Array(clockers.templates.length).fill(0)]);
      });
      setClockers({ ...clockers, table: arr });
    }
  }, []);

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
                  key={index}
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
                                transform: ` scaleY(${
                                  tableToRender.length 
                                }) `,
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
