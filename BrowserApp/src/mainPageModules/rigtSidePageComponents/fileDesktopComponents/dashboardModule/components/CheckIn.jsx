/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const CheckIn = ({ setClockers, clockers, i }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    let total = 0;
    let count = 0;
    for (let j = clockers.table.length - 1; j > 0 && count < 10; j = j - 1) {
      if (typeof clockers.table[j][i] === "boolean" && clockers.table[j][i])
        total += 1;
      count++;
    }
    setResults(
      total &&
        `every ${
          count > 0
            ? (total / count) % 2 === 0
              ? total / count
              : (total / count).toFixed(1)
            : 0
        } day`
    );
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
    },
    [clockers.table, i]
  );

  return (
    <div className="clockonConteiner">
      <div className="clockonConteinerInner">
        <div className="fsb">
          <div>
            <span className="name">{clockers.templates[i - 1].name}</span>
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
            <span className="name">Goal:{clockers.templates[i - 1].goal}</span>
            {results && <span className="name">Results: {results}</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
const CalendarComp = ({ i, table }) => {
  const [rows, setRows] = useState([[]]);

  useEffect(() => {
    let neededarr = table.map((row) => row[i]);
    neededarr.splice(0, 1);
    let arr = [];
    let counter = 0;
    for (let j = 0; j < neededarr.length; j++) {
      if (!arr[counter]) {
        arr[counter] = [];
      }
      arr[counter].push(neededarr[j]);
      if ((j + 1) % 7 === 0) {
        counter += 1;
      }
    }
    setRows(arr);
  }, []);
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
        {rows.map((row, index) => (
          <div className="alignedDiv" key={index}>
            {row.map((date, idx) => (
              <div
                className="indicator"
                key={idx}
                style={{
                  backgroundColor: !date ? "darkred" : "darkgreen",
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
