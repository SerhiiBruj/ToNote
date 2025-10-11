/* eslint-disable react/prop-types */
import {  useLayoutEffect, useMemo, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";
const timeToMilliseconds = (time) => {
  if (!time || typeof time !== "string") {
    return 0;
  }
  const [hours, minutes] = time.split(":").map((val) => Number(val));
  console.log(hours, minutes);
  return (hours * 60 + minutes) * 60 * 1000;
};

const calculateDuration = (ar) => {
  let total = 0;

  for (let j = 0; j < ar.length; j++) {
    const { s, e } = ar[j];
    if (e === null) continue;
    const startTime = timeToMilliseconds(s);
    const endTime = timeToMilliseconds(e);

    total += endTime - startTime;
  }

  return total;
};

const ClockOn = ({ i, clockers, setClockers }) => {
  const results = useMemo(() => {
    if (Array.isArray(clockers.table[clockers.table.length - 1][i])) {
      let count = 0;
      let total = 0;

      for (let j = clockers.table.length - 1; j >= 0 && count < 30; j--) {
        if (Array.isArray(clockers.table[j][i])) {
          for (let k = 0; k < clockers.table[j][i].length; k++) {
            const duration = calculateDuration([clockers.table[j][i][k]]);
            total += duration;
          }
          count++;
        }
      }

      if (count > 0) {
        const averageDuration = total / count;
        const hours = Math.floor(averageDuration / (60 * 60 * 1000));
        const minutes = Math.floor(
          (averageDuration % (60 * 60 * 1000)) / (60 * 1000)
        );
        return `${hours}:${minutes.toString().padStart(2, "0")} a day`;
      } else {
        return "0:00 a day";
      }
    }
    return "0:00 a day";
  }, [clockers.table[clockers.table.length - 1][i]]);

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

  const handleClick = (e) => {
    e.stopPropagation();
    let newClockers = JSON.parse(JSON.stringify(clockers));
    const lastIndex =
      newClockers.table[newClockers.table.length - 1][i].length - 1;
    const currentRow = newClockers.table[newClockers.table.length - 1][i];
    const currentTime = `${String(new Date().getHours()).padStart(
      2,
      "0"
    )}:${String(new Date().getMinutes()).padStart(2, "0")}`;

    if (currentRow[lastIndex] && currentRow[lastIndex].e === null) {
      console.log(currentRow[lastIndex]);
      currentRow[lastIndex].e = currentTime;
      console.log(currentRow[lastIndex]);
    } else {
      console.log(currentRow[lastIndex]);
      let newTime = {
        s: currentTime,
        e: null,
      };
      console.log(currentRow[lastIndex]);
      currentRow.push(newTime);
    }
    setClockers(newClockers);
  };



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

  useLayoutEffect(() => {
    console.log(table[table.length - 1][i]);
    if (Array.isArray(table[table.length - 1][i])) {
      let neededarr = table.map((row) => ({
        date: row[0],
        value: calculateDuration(row[i]),
      }));
      if (neededarr.length > 14) {
        neededarr.splice(0, neededarr.length - 14);
      }

    
      setMonth(
        neededarr[neededarr.length - 1].date.split(".")[1] ===
          neededarr[0].date.split(".")[1]
          ? neededarr[0].date.split(".")[1]
          : neededarr[0].date.split(".")[1] +
              "-" +
              neededarr[neededarr.length - 1].date.split(".")[1]
      );
      const firstDate = new Date(
        neededarr[0].date.split(".").reverse().join("-")
      );
      for (let i = firstDate.getDay(); i > 0; i--) {
        neededarr.unshift(1);
      }
      setRows(neededarr);

    }
  }, [i, table]);

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
        <div className="alignedDivConteiner" style={{
          height:"100%",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-between",
          paddingBottom: 10
        }}>
            <div className="alignedDiv">
              {rows.map((item, idx) => {
                if (item === 1) {
                  return (
                    <div
                      key={idx}
                      className="filler"
                      style={{
                        visibility: "hidden",
                      }}
                    ></div>
                  );
                } else
                  return (
                    <div key={idx} className="filler">
                      <span className="innnerDateIndicator">
                        {item.date&&item.date.split(".")[0]}
                      </span>
                      <div
                        className="indicator"
                        style={{
                          paddingRight: 10,
                          backgroundColor: !item.value>0 ? "brown" : "#1e4f39",
                          color: "lightgray",
                          padding: 5,
                          borderRadius: 5,
                          paddingBottom: 10,
                          fontSize: 15,
                          fontFamily: "Times New Roman",
                        }}
                      >
                        {Math.floor(item.value/(60*60*1000))+":"+Math.floor(item.value/(60*1000))%60}
                      </div>
                    </div>
                  );
              })}
            </div>
          <span
            style={{
              width:"100%",
              textAlign:"center",
              alignSelf: "flex-end",
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
