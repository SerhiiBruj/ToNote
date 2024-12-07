/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const CheckIn = ({ setClockers, clockers, i }) => {
  const results = useMemo(() => {
    let total = 0;
    let count = 0;

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
  const [dates, setRows] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    let neededarr = table.map((row) => ({
      date: row[0],
      value: row[i],
    }));
    if (neededarr.length > 14) {
      neededarr = neededarr.slice(-14);
    }
    const firstDate = new Date(
      neededarr[0].date.split(".").reverse().join("-")
    );
    const firstMonth = neededarr[0].date.split(".")[1];
    for (let i = firstDate.getDay(); i > 0; i--) {
      neededarr.unshift(1);
    }
    setRows(neededarr);
    if (neededarr.length > 0) {
      const lastMonth = neededarr[neededarr.length - 1].date.split(".")[1];
      setMonth(
        firstMonth === lastMonth ? firstMonth : `${firstMonth}-${lastMonth}`
      );
    }
  }, [table, i]);

  return (
    <>
      <div className="schedule">
        <div
          className="alignedDiv days"
          style={{
            display: "grid",
            gap: 0,
            gridTemplateColumns: "repeat(7, 1fr)",
          }}
        >
          <div>s</div>
          <div>m</div>
          <div>t</div>
          <div>w</div>
          <div>t</div>
          <div>f</div>
          <div>s</div>
        </div>
        <div
          className="alignedDiv"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 0,
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 10,
          }}
        >
          <div
            className="alignedDiv"
            style={{
              display: " grid",
              gridTemplateColumns: " repeat(7, 1fr)",
            }}
          >
            {dates.map((date, idx) => (
              <div
                className="indicatorCheckIn"
                key={idx}
                style={{
                  visibility: date === 1 && "hidden",
                  backgroundColor: date.value ? "#1e4f39" : "brown",
                }}
              >
                {date.date && date.date.split(".")[0]}
              </div>
            ))}
          </div>
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
