/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const CheckIn = ({ setClockers, clockers, i }) => {
  useEffect(() => {
    if (typeof clockers.table[clockers.table.length - 1][i] !== "boolean") {
      const newtab = clockers.table.map((row) => {
        if (typeof row[i] !== "boolean") {
          row[i] = false;
        }
        return row;
      });
      setClockers({ ...clockers, table: newtab });
    }
  }, []);
  const results = useMemo(() => {
    let total = 0;
    let count = 0; // Count will track the number of valid entries checked

    // Loop through the table in reverse, checking up to 30 rows
    for (let j = clockers.table.length - 1; j >= 0 && count < 30; j--) {
      if (
        typeof clockers.table[j][i] === "boolean" &&
        clockers.table[j][i] === true
      ) {
        total += 1;
      }
      count += 1; 
    }

    if (count > 0) {
      const average = total / count;
      const formattedResult = average % 1 === 0 ? 1 : average.toFixed(1);
      return `every ${formattedResult} day${formattedResult > 1 ? "s" : ""}`;
    } else {
      return "No data";
    }
  }, [clockers.table, i]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      const newTable = [...clockers.table];
      newTable[newTable.length - 1][i] = true;
      setClockers({
        ...clockers,
        table: newTable,
      });
      console.log("clockers");
      console.log("handleClick");
    },
    [clockers.table, i]
  );

  return (
    <div className="clockonConteiner">
      <div className="clockonConteinerInner">
        <div className="fsb">
          <div>
            <span className="name">{clockers.templates[i - 1].fileName}</span>
            <br />
            <span>Started:{clockers.templates[i - 1].dateOfStart}</span>
          </div>
          <BellsIcon size={1.5} />
        </div>
        <CalendarComp i={i} table={clockers.table} />
      </div>
      <div className="clockonConteinerInner">
        <div
          className="fcsb"
          style={{
            height: "150%",
          }}
        >
          <div className="fe">
            <div
              className="clockOn"
              onClick={(e) => handleClick(e)}
              style={{ textAlign: "center" }}
              size={200}
              color={"#313131"}
            >
              {clockers.table[clockers.table.length - 1][i]
                ? "checked in"
                : "check in"}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
const CalendarComp = ({ i, table }) => {
  const [rows, setRows] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    // Створюємо масив з датами та значеннями
    let neededarr = table.map((row) => ({
      date: row[0],
      value: row[i],
    }));

    // Обрізаємо масив до останніх 21 записів
    if (neededarr.length > 21) {
      neededarr = neededarr.slice(-21);
    }
    let arr = [];
    for (let j = 0; j < neededarr.length; j += 7) {
      arr.push(neededarr.slice(j, j + 7));
    }
    setRows(arr);

    // Визначаємо місяць для відображення
    if (arr.length > 0) {
      const firstMonth = arr[0][0].date.split(".")[1];
      const lastMonth =
        arr[arr.length - 1][arr[arr.length - 1].length - 1].date.split(".")[1];
      setMonth(
        firstMonth === lastMonth ? firstMonth : `${firstMonth}-${lastMonth}`
      );
    }
  }, [table, i]);

  return (
    <>
      <div className="schedule">
        <div className="alignedDiv days">
          <div>s</div>
          <div>m</div>
          <div>t</div>
          <div>w</div>
          <div>t</div>
          <div>f</div>
          <div>s</div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 10,
          }}
        >
          {rows.map((row, index) => (
            <div
              className="alignedDiv"
              key={index}
              style={{
                gap: "7%",
              }}
            >
              {row.map((date, idx) => (
                <div
                  className="indicator"
                  key={idx}
                  style={{
                    backgroundColor: date.value ? "#1e4f39" : "brown",
                    transition: "background-color 0.5s ease",
                    color: "white",
                    borderRadius: "20%",
                    fontSize: "18px",
                    width: "8%",
                    height: "fit-content",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {date.date.split(".")[0]}
                </div>
              ))}
            </div>
          ))}
          <span
            style={{
              alignSelf: "flex-end",
              paddingRight: "55%",
              color: "lightgray",
            }}
          >
            {month}
          </span>
        </div>
      </div>
    </>
  );
};
