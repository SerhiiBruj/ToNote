/* eslint-disable react/prop-types */
import { useCallback, useEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";

const Timer = ({ setClockers, clockers, i, colors }) => {
  const [results, setResults] = useState(null);
  const [timerTime, setTimerTime] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const bestResults = useMemo(() => {
    let count = 0;
    for (let j = clockers.table.length - 1; j >= 0 && count < 30; j--) {
      if (Array.isArray(clockers.table[j][i])) {
        clockers.table[j][i].forEach((element) => {
          if (typeof element === "number" && element > count) {
            count = element;
          }
        });
      }
    }
    return count;
  }, [clockers.table]);

  useEffect(() => {
    try {
      let total = 0;
      let count = 0;
      for (let j = clockers.table.length - 1; j > 0 && count < 10; j = j - 1) {
        clockers.table[j][i].forEach((element) => {
          if (typeof element === "number") {
            total += element;
            count++;
          }
        });
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
  }, [clockers.table[clockers.table.length - 1][i]]);

  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();

      if (isTimerActive) {
        clearInterval(intervalId);
        setIsTimerActive(false);
        setIntervalId(null);

        if (timerTime > 0) {
          let newTable = [...clockers.table];
          if (!Array.isArray(newTable[newTable.length - 1][i])) {
            newTable[newTable.length - 1][i] = [];
          }

          newTable[newTable.length - 1][i].push(timerTime);
          setClockers({ ...clockers, table: newTable });
        }
        setTimerTime(0);
      } else {
        setIsTimerActive(true);
        const newIntervalId = setInterval(() => {
          setTimerTime((prevTime) => prevTime + 1);
        }, 1000);
        setIntervalId(newIntervalId);
      }
    },
    [intervalId, timerTime]
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
        <TimerDiagram
          bestResults={bestResults}
          i={i}
          table={clockers.table}
          colors={colors}
        />
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
              {isTimerActive ? ` ${timerTime} sec` : "Start"}
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
            {bestResults && (
              <span className="name">Best result: {bestResults}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
const TimerDiagram = ({ bestResults, i, table, colors }) => {
  const [neededAr, setNeededAr] = useState([]);
  let count = 0;
  useEffect(() => {
    try {
      const newNeededAr = table
        .map((row, index) =>
          table.length - index <= 7 ? { date: row[0], value: row[i] } : null
        )
        .filter((el) => el !== null);

      setNeededAr(newNeededAr.reverse());
    } catch (er) {
      console.error(er);
    }
  }, [table, i]);

  return (
    <div className="schedule">
      <div
        className="diagram"
        style={{
          display: "flex",
          height: "100%",
          flexDirection: "row-reverse",
          justifyContent: "flex-end",
        }}
      >
        {neededAr.map((el, index) => {
          if (count < 4)
            return (
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
                  className="div"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "flex-end",
                    height: "80% ",
                  }}
                >
                  {Array.isArray(el.value) &&
                    el.value.slice(-4).map((element, idx) => {
                      count++;
                      if (count < 5 && element)
                        return (
                            <div
                              key={idx}
                              style={{
                                background: colors[index],
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "lightgray",
                                width: "100%",
                                height: `${Math.min(
                                  (element / bestResults) * 100,
                                  100
                                )}%`,

                                overflow: "hidden",
                              }}
                            >
                              {element}
                            </div>
                        );
                    })}
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
            );
        })}
      </div>
    </div>
  );
};
