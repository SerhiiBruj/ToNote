/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const ClockOn = ({ i, clockers, setClockers }) => {
  const [results, setResults] = useState(null);
  const bestResults = useMemo(() => {
    let count = 0;
    for (let j = clockers.table.length - 1; j > 0 && count < 30; j--) {
      if (clockers.table[j][i] > count) {
        count = clockers.table[j][i];
      }
    }

    return count;
  }, [clockers.table, i]);

  useEffect(() => {
    const updatedTable = clockers.table.map((element) => {
      if (!Array.isArray(element[i])) {
        return [
          ...element.slice(0, i),
          [{ s: "14:00", e: "15:40" }],
          ...element.slice(i + 1),
        ];
      } else {
        return element;
      }
    });
    if(JSON.stringify(updatedTable)!==JSON.stringify(clockers.table))
    setClockers({ ...clockers, table: updatedTable });
  console.log('object')
  },[clockers.table]);




  useEffect(() => {
    let total = 0;
    let count = 0;
    for (let j = clockers.table.length - 1; j > 0 && count < 10; j = j - 1) {
      if (typeof clockers.table[j][i] === "number" && clockers.table[j][i])
        total += clockers.table[j][i];
      count++;
    }
    setResults(
      ` ${
        count > 0
          ? (total / count) % 2 === 0
            ? total / count
            : (total / count).toFixed(1)
          : 0
      } a day`
    );
  }, [clockers.table, i]);

  const handleClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

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
        <ClockOnSchedule table={clockers.table} i={i} />
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
              ClockOn
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
            {bestResults > 0 ? (
              <span className="name">Best result: {bestResults}</span>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockOn;

const ClockOnSchedule = ({ i, table }) => {
  const [rows, setRows] = useState([[]]);
  const [month, setMonth] = useState("");
  const timeToMilliseconds = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1000; // Конвертуємо години та хвилини у мілісекунди
  };

  // Функція для обчислення тривалості між двома часами
  const calculateDuration = ({ s, e }) => {
    const startTime = timeToMilliseconds(s);
    const endTime = timeToMilliseconds(e);

    const durationMs = endTime - startTime;

    // Перетворення тривалості у години та хвилини
    const hours = Math.floor(durationMs / (60 * 60 * 1000));
    const minutes = Math.floor((durationMs % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    let neededarr = table.map((row) => ({ date: row[0], value: row[i] }));
    console.log(table[table.length - 1][i]);
    if (neededarr.length > 21) {
      neededarr.splice(0, neededarr.length - 14);
    }
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
  }, [i, table]);
  useEffect(() => {
    if (
      rows.length > 0 &&
      rows[0].length > 0 &&
      rows[rows.length - 1].length > 0
    ) {
      setMonth(
        rows[rows.length - 1][rows[rows.length - 1].length - 1].date.split(
          "."
        )[1] === rows[0][0].date.split(".")[1]
          ? rows[0][0].date.split(".")[1]
          : rows[0][0].date.split(".")[1] +
              "-" +
              rows[rows.length - 1][
                rows[rows.length - 1].length - 1
              ].date.split(".")[1]
      );
    }
  }, [rows]);

  return (
    <>
      <div className="schedule">
        <div
          className="alignedDiv days"
          style={{
            paddingBottom: 0,
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
              style={{ gap: 0, paddingBottom: 0 }}
            >
              {row.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: "14.28% ",
                    paddingBottom: 5,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <span
                    style={{
                      position: "relative",
                      transform: "translateY(5px) translateX(0px)",
                      fontSize: 12,
                      justifySelf: "flex-start",
                      background: "#03a9f4",
                      padding: 5,
                      color: "black",
                      alignSelf: "flex-end",
                      borderRadius: "50%",
                    }}
                  >
                    {item.date.split(".")[0]}
                  </span>
                  <div
                    className="indicator"
                    style={{
                      backgroundColor: !item.value ? "brown" : "#1e4f39",
                      color: "lightgray",
                      padding: 5,
                      borderRadius: 5,
                      paddingBottom: 10,
                      fontSize: 15,
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {typeof item.value[0] === "object" &&
                      calculateDuration(item.value[0])}
                  </div>
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

// function deepCopyArray(arr) {
//   return arr.map((item) => {
//     if (Array.isArray(item)) {
//       return deepCopyArray(item);
//     } else if (item !== null && typeof item === "object") {
//       return deepCopyObject(item);
//     } else {
//       return item;
//     }
//   });
// }
