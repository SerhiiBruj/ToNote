import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as XLSX from "xlsx";
import { clearSelection, stopSelection } from "../../../../redux/selectSlice";
import { updateShowExpo } from "../../../../redux/showExpo";
import { useLocation } from "react-router-dom";
let listOfFileTypes = [
  "dashboard",
  "note",
  "checklist",
  "todo",
  "table",
  "diary",
];

const Popover = () => {
  const ref = useRef();
  const showSomething = useSelector((state) => state.showExpo.value);
  const { selected } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    if (location.pathname.split("/")[3]) {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }, [location.pathname]);
  const exportfiles = () => {
    if (isHome) {
      for (let i of selected) {
        if (i.split("/")[0] === "note" && sessionStorage.getItem(i)) {
          const text = JSON.parse(sessionStorage.getItem(i), null, 2);
          const blob = new Blob([text], { type: "text/plain" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${i.split("/")[1]}.txt`;
          link.click();
          URL.revokeObjectURL(url);
        }
        if (i.split("/")[0] === "todo" && sessionStorage.getItem(i)) {
          const todos = JSON.parse(sessionStorage.getItem(i)).join("\n");
          const blob = new Blob([todos], {
            type: "text/plain",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${i.split("/")[1]}.txt`;
          link.click();
          URL.revokeObjectURL(url);
        }
        if (i.split("/")[0] === "checklist" && sessionStorage.getItem(i)) {
          const checklists = JSON.parse(sessionStorage.getItem(i))
            .map(
              (checklist) => `${checklist.p}\n\t${checklist.desc.map(desc=>desc.value).join("\n\t")}`
            )
            .join("\n\n");
          const blob = new Blob([checklists], {
            type: "text/plain",
          });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `${i.split("/")[1]}.txt`;
          link.click();
          URL.revokeObjectURL(url);
        }
        if (i.split("/")[0] === "table" && sessionStorage.getItem(i)) {
          const ws = XLSX.utils.aoa_to_sheet(
            JSON.parse(sessionStorage.getItem(i))
          );
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, `${i.split("/")[1]}.xlsx`);
        }
        if (i.split("/")[0] === "dashboard" && sessionStorage.getItem(i)) {
          const ws = XLSX.utils.aoa_to_sheet(
            JSON.parse(
              sessionStorage.getItem(
                `dashboard/${location.pathname.split("/")[3]}`
              )
            ).table.map((row) =>
              row.map((td) => (Array.isArray(td) ? td.join(", ") : td))
            )
          );
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, `${i.split("/")[1]}.xlsx`);
        }
        console.log(i);
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      dispatch(updateShowExpo(true));

      switch (location.pathname.split("/")[2]) {
        case "note":
          {
            const text = JSON.parse(
              sessionStorage.getItem(`note/${location.pathname.split("/")[3]}`),
              null,
              2
            );
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${location.pathname.split("/")[3]}.txt`;
            link.click();
            URL.revokeObjectURL(url);
          }
          break;
        case "checklist":
          {
            const checklists = JSON.parse(
              sessionStorage.getItem(
                `checklist/${location.pathname.split("/")[3]}`
              )
            )
              .map(
                (checklist) =>
                  `${checklist.p}\n\t${checklist.desc.map(desc=>desc.value).join("\n\t")}`
              )
              .join("\n\n");
            const blob = new Blob([checklists], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${location.pathname.split("/")[3]}.txt`;
            link.click();
            URL.revokeObjectURL(url);
          }
          break;
        case "todo":
          {
            const todos = JSON.parse(
              sessionStorage.getItem(`todo/${location.pathname.split("/")[3]}`)
            ).join("\n");
            const blob = new Blob([todos], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${location.pathname.split("/")[3]}.txt`;
            link.click();
            URL.revokeObjectURL(url);
          }
          break;
        case "table":
          {
            const ws = XLSX.utils.aoa_to_sheet(
              JSON.parse(
                sessionStorage.getItem(`table/${location.pathname.split("/")[3]}`)
              )
            );
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `${location.pathname.split("/")[3]}.xlsx`);
          }
          break;
        case "dashboard":
          {
            const ws = XLSX.utils.aoa_to_sheet(
              JSON.parse(
                sessionStorage.getItem(
                  `dashboard/${location.pathname.split("/")[3]}`
                )
              ).table.map((row) =>
                row.map((td) => (Array.isArray(td) ? td.join(", ") : td))
              )
            );
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
            XLSX.writeFile(wb, `${location.pathname.split("/")[3]}.xlsx`);
          }
          break;
        default:
          {
            console.log("no Eport");
          }
          break;
      }
    }
    dispatch(stopSelection());
    dispatch(clearSelection());
    dispatch(updateShowExpo(false));
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "25%",
        padding: 10,
        height: "25%",
        background: "#7c7c7c",
        right: 0,
        bottom: 0,
        borderTop: "solid #1e1e1e 5px",
        transition: "all 0.5s",
        transform: showSomething ? "none" : "translateX(500vw)",
        borderTopLeftRadius: 50,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
      ref={ref}
    >
      <p
        style={{
          textWrap: "balance",
          textAlign: "center",
          fontSize: 25,
        }}
      >
        For now we have ony two options to share your files
      </p>
      <div className="flex" style={{ display: "flex", gap: 10 }}>
        <button
          className="button"
          onClick={exportfiles}
          style={{
            outline: "none",
            border: "none",
            background: "lightgray",
            borderRadius: 15,
            padding: 10,
          }}
        >
          Download
        </button>
        <button
          style={{
            outline: "none",
            border: "none",
            background: "lightgray",
            borderRadius: 15,
            padding: 10,
          }}
          className="button"
        >
          Via link
        </button>
      </div>
    </div>
  );
};

export default Popover;
