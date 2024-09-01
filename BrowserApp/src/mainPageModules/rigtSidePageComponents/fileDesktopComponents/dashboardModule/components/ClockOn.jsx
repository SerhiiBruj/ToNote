/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";
const timeToMilliseconds = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return (hours * 60 + minutes) * 60 * 1000;
};
const calculateDuration = (ar) => {
  let total = 0;

  for (let j = 0; j < ar.length; j++) {
    let { s, e } = ar[j];

    if (!e) continue;

    const startTime = timeToMilliseconds(s);
    const endTime = timeToMilliseconds(e);

    total += endTime - startTime;
  }

  return total;
};

const ClockOn = ({ i, clockers, setClockers }) => {
  useEffect(() => {
    if (!Array.isArray(clockers.table[clockers.table.length - 1][i])) {
      const updatedTable = clockers.table.map((element) => {
        if (!Array.isArray(element[i])) {
          return [...element.slice(0, i), [], ...element.slice(i + 1)];
        } else {
          return element;
        }
      });
      if (JSON.stringify(updatedTable) !== JSON.stringify(clockers.table))
        setClockers({ ...clockers, table: updatedTable });
    }
  }, [clockers.table, i]);

  const results = useMemo(() => {
    if (Array.isArray(clockers.table[clockers.table.length - 1][i])) {
      let total = 0;
      let count = clockers.table.length < 30 ? clockers.table.length : 29;
      for (let j = clockers.table.length - 1; j >= 0 && count < 30; j--) {
        if (Array.isArray(clockers.table[j][i])) {
          for (let k = 0; k < clockers.table[j][i].length; k++) {
            total += calculateDuration(clockers.table[j][i]);
          }
        }
      }
      console.log(count)

      if (count > 0) {
        total = total / count;
        const hours = Math.floor(total / (60 * 60 * 1000));
        const minutes = Math.floor((total % (60 * 60 * 1000)) / (60 * 1000));
        return `${hours}:${minutes} a day`;
      } else {
        return "0:0 a day";
      }
    }
  }, [clockers.table]);

  const bestResults = useMemo(() => {
    if (Array.isArray(clockers.table[clockers.table.length - 1][i])) {
      try {
        let maxDuration = 0;

        for (
          let j = clockers.table.length - 1;
          j >= 0 && j >= clockers.table.length - 30;
          j--
        ) {
          const duration = calculateDuration(clockers.table[j][i]);
          if (duration > maxDuration) {
            maxDuration = duration;
          }
        }

        const hours = Math.floor(maxDuration / (60 * 60 * 1000));
        const minutes = Math.floor(
          (maxDuration % (60 * 60 * 1000)) / (60 * 1000)
        );
        console.log(hours, minutes);

        return `${hours}:${minutes}`;
      } catch (er) {
        console.log(er.message);
      }
    }
    console.log("useMemo");
  }, [clockers.table, i]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      let newClockers = JSON.parse(JSON.stringify(clockers));

      if (
        newClockers.table[newClockers.table.length - 1][i].length > 0 &&
        !newClockers.table[newClockers.table.length - 1][i][
          newClockers.table[newClockers.table.length - 1][i].length - 1
        ]?.e
      ) {
        // Якщо останній запис ще не завершено, оновлюємо його
        newClockers.table[newClockers.table.length - 1][i][
          newClockers.table[newClockers.table.length - 1][i].length - 1
        ] = {
          ...newClockers.table[newClockers.table.length - 1][i][
            newClockers.table[newClockers.table.length - 1][i].length - 1
          ],
          e: `${String(new Date().getHours()).padStart(2, "0")}:${String(
            new Date().getMinutes()
          ).padStart(2, "0")}`,
        };
      } else {
        // Інакше створюємо новий запис
        let newTime = {
          s: `${String(new Date().getHours()).padStart(2, "0")}:${String(
            new Date().getMinutes()
          ).padStart(2, "0")}`,
          e: null, // Значення кінцевого часу встановлюється як null
        };
        newClockers.table[newClockers.table.length - 1][i].push(newTime);
      }

      setClockers(newClockers);
      console.log("handleClick");
    },
    [clockers, i]
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
              {!!clockers.table[clockers.table.length - 1][i][0] &&
              !clockers.table[clockers.table.length - 1][i][
                clockers.table[clockers.table.length - 1][i].length - 1
              ].e
                ? `started at ${
                    clockers.table[clockers.table.length - 1][i][
                      clockers.table[clockers.table.length - 1][i].length - 1
                    ].s
                  }`
                : "ClockOn"}
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

export default ClockOn;

const ClockOnSchedule = ({ i, table }) => {
  const [rows, setRows] = useState([[]]);
  const [month, setMonth] = useState("");
  const timeToMilliseconds = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return (hours * 60 + minutes) * 60 * 1000; // Конвертуємо години та хвилини у мілісекунди
  };

  const calculateDuration = (ar) => {
    let total = 0;

    for (let j = 0; j < ar.length; j++) {
      let { s, e } = ar[j];

      if (!e) continue;

      const startTime = timeToMilliseconds(s);
      const endTime = timeToMilliseconds(e);

      total += endTime - startTime;
    }

    const hours = Math.floor(total / (60 * 60 * 1000));
    const minutes = Math.floor((total % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}:${minutes}`;
  };
  useEffect(() => {
    console.log(table[table.length - 1][i]);
    if (Array.isArray(table[table.length - 1][i])) {
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
    }
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
                      backgroundColor: !item.value[0] ? "brown" : "#1e4f39",
                      color: "lightgray",
                      padding: 5,
                      borderRadius: 5,
                      paddingBottom: 10,
                      fontSize: 15,
                      fontFamily: "Times New Roman",
                    }}
                  >
                    {typeof item.value[0] === "object" &&
                      item.value[0].e &&
                      calculateDuration(item.value)}
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
