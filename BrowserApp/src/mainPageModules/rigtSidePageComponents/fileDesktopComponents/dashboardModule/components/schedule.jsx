/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

const Schedule = ({ type, i, table }) => {
  return (
    <div className="schedule">
      {type === "check in" && <CalendarComp i={i} table={table} />}
      {type === "counter" && <Diagram i={i} table={table} />}
      {type === "timer" && <TimerDiagram i={i} table={table} />}
      {type === "clock on" && <ClockOnSchedule i={i} table={table} />}
    </div>
  );
};

export default Schedule;

const TimerDiagram = ({ i, table }) => {
  const [neededAr, setNeededAr] = useState([]);
  const [ser, setSer] = useState(0);
  let count = 0;
  useEffect(() => {
    try {
      const newNeededAr = table
        .map((row, index) =>
          table.length - index <= 7 ? { date: row[0], value: row[i] } : null
        )
        .filter((el) => el !== null);

      setNeededAr(newNeededAr.reverse());

      if (newNeededAr.length > 0) {
        let total = 0;
        let count = 0;
        for (let j = table.length - 1; j > 0 && count < 10; j = j - 1) {
          table[j][i].forEach((element) => {
            if (typeof element === "number") {
              total += element;
              count++;
            }
          });
        }
        setSer(
          count > 0
            ? (total / count) % 2 === 0
              ? total / count
              : (total / count).toFixed(1)
            : 0
        );
      }
    } catch (er) {
      console.error(er);
    }
  }, [table, i]);

  return (
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
        if(count<4)
        return (
          <>
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
                {el.value.slice(-4).map((element) => {
                  count++
                  if(count<5)
                  return (
                    <>
                      <div
                        style={{
                          background: colors[index],
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          color: "lightgray",
                          width: "100%",
                          height: `${Math.min(ser * element, 100)}%`,
                          overflow: "hidden",
                        }}
                      >
                        {element}
                      </div>
                    </>
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
          </>
        );
      })}
    </div>
  );
};

const ClockOnSchedule = ({ i, table }) => {
  const [rows, setRows] = useState([[]]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    let neededarr = table.map((row) => ({ date: row[0], value: row[i] }));
    neededarr.splice(0, 1);
    if (neededarr.length > 14) {
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
  }, [table]);
  useEffect(() => {
    setMonth(
      rows[0][0] &&
        (rows[rows.length - 1][rows[rows.length - 1].length - 1].date.split(
          "."
        )[1] === rows[0][0].date.split(".")[1]
          ? rows[0][0].date.split(".")[1]
          : rows[0][0].date.split(".")[1] +
            "-" +
            rows[rows.length - 1][rows[rows.length - 1].length - 1].date.split(
              "."
            )[1])
    );
  }, [rows]);

  return (
    <>
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
                  transform: "translateY(7px) translateX(-10px)",
                  fontSize: 12,
                  justifySelf: "flex-start",
                  background: "#03a9f4",
                  padding: 5,
                  color: "black",
                  alignSelf: "flex-end",
                  borderRadius: 5,
                }}
              >
                {item.date.split(".")[0]}
              </span>
              <div
                className="indicator"
                style={{
                  backgroundColor: !item.value ? "darkred" : "darkgreen",
                  color: "lightgray",
                  padding: 5,
                  borderRadius: 5,
                  paddingBottom: 10,
                }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      ))}
      <br />
      <span
        style={{
          color: "white",
          alignSelf: "center",
          paddingBottom: 50,
        }}
      >
        {month}
      </span>
    </>
  );
};

const Diagram = ({ table, i }) => {
  const [neededAr, setNeededAr] = useState([]);
  const [ser, setSer] = useState(0);

  useEffect(() => {
    try {
      const newNeededAr = table
        .map((row, index) =>
          table.length - index <= 7 ? { date: row[0], value: row[i] } : null
        )
        .filter((el) => el !== null);

      setNeededAr(newNeededAr);

      if (newNeededAr.length > 0) {
        const newSer =
          newNeededAr.length > 0
            ? newNeededAr.map((el) => el.value).reduce((a, b) => a + b, 0) /
              newNeededAr.length
            : 0;

        setSer(newSer);
      }
    } catch (er) {
      console.error(er);
    }
  }, [table, i]);

  return (
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
                el.value < colors.length - 1
                  ? colors[el.value]
                  : colors[el.value - colors.length],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "lightgray",
              width: "100%",
              height: `${Math.min(1.5 * ser * el.value, 80)}%`,
              overflow: "hidden",
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
  );
};


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
    </>
  );
};
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
