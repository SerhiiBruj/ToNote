/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import BellsIcon from "../../../../../assetModules/svgs/bellsIcon";
import Schedule from "./schedule";

const Clocker = ({ dateOfStart, name, type, table, goal, i }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    switch (type) {
      case "counter":
        try {
          let total = 0;
          let count = 0;
          for (let j = table.length - 1; j > 0 && count < 30; j = j - 1) {
            if (typeof table[j][i] === "number") {
              total += table[j][i];
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
        break;

      case "timer":
        try {
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
        break;
      default:
        {
          console.log("havent done yet");
        }
        break;
    }
  }, [table, i]);

  return (
    <div className="clockonConteiner">
      <div className="clockonConteinerInner">
        <div className="fsb">
          <div>
            <span className="name">{name}</span>
            <br />
            <span>Started:{dateOfStart}</span>
          </div>
          <BellsIcon size={1.5} />
        </div>
        <Schedule type={type} i={i} table={table} />
      </div>
      <div className="clockonConteinerInner">
        <div className="fcsb">
          <div className="fe">
            <div
              className="clockOn"
              style={{ textAlign: "center" }}
              size={200}
              color={"#313131"}
            >
              {type === "timer" ? (
                "Start"
              ) : type === "counter" ? (
                <>
                  Increase <br />
                  {table[table.length - 1][i]}
                </>
              ) : (
                type
              )}
            </div>
          </div>
          <span className="name">Goal:{goal}</span>
          <span className="name">Results: {results}</span>
        </div>
      </div>
    </div>
  );
};

export default Clocker;
