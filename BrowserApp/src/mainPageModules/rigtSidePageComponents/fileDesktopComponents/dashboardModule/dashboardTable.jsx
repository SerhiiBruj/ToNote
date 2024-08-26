import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

const dashboardTable = () => {
  const location = useLocation();
  const name = useMemo(() => {
    return location.pathname.split("/")[3];
  }, [location.pathname]);
  const table = JSON.parse(
    localStorage.getItem(`dashboard/${name.replace(/(%20|_)/g, " ")}`)
  ).table;

  useEffect(() => {
    console.log(table);
  }, []);

  return (
    <>
      <div
        className="conteiner fileConteiner"
        style={{ display: "flex" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="table"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {table.map((row, index) => (
            <div key={index} className="tableRow" style={{ display: "flex" }}>
              {row.map((td, i) => {
                if (index === 0 || i === 0) {
                  return (
                    <>
                      {!i && index !== 0 ? (
                        <div
                          key={i}
                          className="line"
                          style={{
                            transform: ` scaleX(${
                              row.length * 2.3
                            }) rotate(-90deg)`,
                          }}
                        ></div>
                      ) : !index && i !== 0 ? (
                        <div
                          key={i}
                          className="line"
                          style={{
                            transform: ` scaleY(${table.length}) `,
                            height: 80,
                          }}
                        ></div>
                      ) : null}
                      <div key={i} className="tableCell">
                        <p style={{
                          textAlign:' center'
                        }}>{td}</p>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <div key={i} className="tableCell">
                     {Array.isArray(td) ? td.join(", ") : typeof td === "boolean" ? String(td) : td}
                    </div>
                  );
                }
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default dashboardTable;
