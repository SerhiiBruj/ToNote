/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";
import Arrow from "../../../../../assetModules/svgs/arrow";

const Counter = ({ i, clockers, setClockers }) => {
  const counter = useMemo(
    () => clockers.table[clockers.table.length - 1][i] || 0,
    [clockers.table[clockers.table.length - 1][i]]
  );
  const [results, setResults] = useState(null);
  const bestResults = useMemo(() => {
    let max = 0;

    for (let j = clockers.table.length - 1; j >= 0; j--) {
      const value = clockers.table[j][i];
      if (typeof value === "number" && value > max) {
        max = value;
      }
    }
    console.log("useMemo");
    return max === -Infinity ? null : max; // Повертаємо null, якщо значень не знайдено
  }, [clockers.table, i]);
  useEffect(() => {
    try {
      let total = 0;
      let count = 0;
      for (let j = clockers.table.length - 1; j > 0 && count < 30; j--) {
        if (typeof clockers.table[j][i] === "number") {
          total += clockers.table[j][i];
          count++;
        }
      }
      setResults(
        count > 0
          ? (total / count) % 2 === 0
            ? total / count
            : (total / count).toFixed(1)
          : 0
      );
    } catch (er) {
      console.log(er.message);
    }

    console.log("useEffect");
  }, [clockers.table[clockers.table.length - 1][i]]);

  const handleClickIncrease = () => {
    const newTable = [...clockers.table];
    newTable[newTable.length - 1][i] = newTable[newTable.length - 1][i] + 1;

    setClockers({
      ...clockers,
      table: newTable,
    });
  };
  const handleClickDerease = () => {
    if (clockers.table[clockers.table.length - 1][i] > 0) {
      const newTable = [...clockers.table];
      newTable[newTable.length - 1][i] = newTable[newTable.length - 1][i] - 1;

      setClockers({
        ...clockers,
        table: newTable,
      });
      console.log("handleClick");
    }
  };
  return (
    <div className="clockonConteiner">
      <div className="clockonConteinerInner">
        <div className="fsb">
          <div>
            <span className="name">{clockers.templates[i - 1].fileName}</span>
            <br />
            <span>Started: {clockers.templates[i - 1].dateOfStart}</span>
          </div>
          <BellsIcon size={1.5} />
        </div>
        <Diagram i={i} table={clockers.table} bestResults={bestResults} />
      </div>
      <div className="clockonConteinerInner">
        <div className="fcsb" style={{ height: "150%" }}>
          <div className="fe">
            <div
              className="clockOn"
              style={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 160,
                width: 160,
                padding: 20,
              }}
            >
              <span
                onClick={handleClickIncrease}
                style={{
                  cursor: "pointer",
                  transform: "rotate(90deg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Arrow size={"2.5vw"} /> <br />
              </span>
              {counter}
              <br />
              <span
                onClick={handleClickDerease}
                style={{
                  cursor: "pointer",
                  transform: "rotate(-90deg)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Arrow size={"2.5vw"} />
              </span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifySelf: "flex-end",
            }}
          >
            {!!clockers.templates[i - 1].goal && (
              <span className="name">
                Goal:{clockers.templates[i - 1].goal}
              </span>
            )}
            {!!results && <span className="name">Results: {results}</span>}
            {bestResults ? (
              <span className="name">Best result: {bestResults}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const Diagram = ({ table, i, bestResults }) => {
  const [neededAr, setNeededAr] = useState([]);
  const colors = [
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

  useEffect(() => {
    try {
      const newNeededAr = table
        .map((row, index) =>
          table.length - index <= 7 ? { date: row[0], value: row[i] } : null
        )
        .filter((el) => el !== null);
      setNeededAr(newNeededAr);
    } catch (er) {
      console.error(er);
    }
  }, [table, i]);

  return (
    <div className="schedule">
      <div
        className="diagram"
        style={{ display: "flex", height: "100%", justifyContent: "flex-end" }}
      >
        {neededAr.map((el, index) => (
          <div
            key={index}
            style={{
              height: "100%",
              flex: 1,
              backgroundColor: el ? "gray" : "lightgray",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <div
              style={{
                background:
                  el.value < colors.length
                    ? colors[el.value]
                    : colors[el.value % colors.length],
                transition: "all 0.1s",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "lightgray",
                width: "100%",
                height: `${Math.min((el.value / bestResults) * 80, 80)}%`,
                minHeight: "6%",
              }}
            >
              {el.value}
            </div>
            <div
              style={{
                alignSelf: "center",
                height: "20%",
                background: "#00000052",
                width: "100%",
                textAlign: "center",
                color: "lightgray",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {el.date.split(".")[0]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Counter;
