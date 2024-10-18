import { memo, useCallback, useEffect, useRef, useState } from "react";
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
  const { selected } = useSelector((state) => state.select);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    console.log(selected);
    if (location.pathname.split("/")[3]) {
      setIsHome(false);
    } else {
      setIsHome(true);
    }
  }, [location.pathname]);

  const exportfiles = useCallback(() => {
    if (isHome) {
      console.log("fdfdsfds", selected);
      for (let i of selected) {
        const type = i.split("/")[0];
        switch (type) {
          case "note":
            expNote(i);
            break;
          case "todo":
            expTodo(i);
            break;
          case "checklist":
            expCheckList(i);
            break;
          case "table":
            expTable(i);
            break;
          case "dashboard":
            expDashboard(i);
            break;
          default:
            console.log(`Unknown type: ${type}`);
        }
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      dispatch(updateShowExpo(true));

      switch (location.pathname.split("/")[2]) {
        case "note":
          expNote(`note/${location.pathname.split("/")[3]}`);
          break;
        case "checklist":
          expCheckList(`checklist/${location.pathname.split("/")[3]}`);
          break;
        case "todo":
          expTodo(`todo/${location.pathname.split("/")[3]}`);
          break;
        case "table":
          expTable(`table/${location.pathname.split("/")[3]}`);

          break;
        case "dashboard":
          expDashboard(`dashboard/${location.pathname.split("/")[3]}`);
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
  }, [location.pathname, isHome]);

  return (
<div
  style={{
    width: "25%",
    padding: 10,
    height: "30%",
    background: "#7c7c7c",
    right: 0,
    bottom: 0,
    borderTop: "solid #1e1e1e 5px",
    transition: "all 0.5s",
    borderTopLeftRadius: 50,
    zIndex: 3,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    position: "fixed", 
    gap: 10,
  }}
  ref={ref}
>
  <p
    style={{
      wordWrap: "break-word", 
      textAlign: "center",
      fontSize: 25,
    }}
  >
    For now we have only two options to share your files
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

export default memo(Popover);

const createAndDownloadFile = (content, fileName, fileType) => {
  const blob = new Blob([content], { type: fileType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
};

const expNote = (typename) => {
  let text = sessionStorage.getItem(typename) || localStorage.getItem(typename);
  text = JSON.parse(text);
  createAndDownloadFile(text, `${typename.split("/")[1]}.txt`, "text/plain");
};

const expTodo = (typename) => {
  let todos =
    sessionStorage.getItem(typename) || localStorage.getItem(typename);
  todos = JSON.parse(todos).join("\n");
  createAndDownloadFile(todos, `${typename.split("/")[1]}.txt`, "text/plain");
};

const expCheckList = (typename) => {
  const checklists = JSON.parse(
    sessionStorage.getItem(typename) || localStorage.getItem(typename)
  )
    .map(
      (checklist) =>
        `${checklist.p}\n\t${checklist.desc
          .map((desc) => desc.value)
          .join("\n\t")}`
    )
    .join("\n\n");
  createAndDownloadFile(
    checklists,
    `${typename.split("/")[1]}.txt`,
    "text/plain"
  );
};

const expTable = (typename) => {
  const tableData = JSON.parse(
    sessionStorage.getItem(typename) || localStorage.getItem(typename)
  );
  const ws = XLSX.utils.aoa_to_sheet(tableData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  XLSX.writeFile(wb, `${typename.split("/")[1]}.xlsx`);
};

const expDashboard = (typename) => {
  let clockers =
    sessionStorage.getItem(typename) || localStorage.getItem(typename);
  if (!clockers) {
    console.error(`No data found for ${typename}`);
    return;
  }
  try {
    clockers = JSON.parse(clockers);
    console.log("Parsed clockers data:", clockers);

    const table = [
      [
        "",
        ...clockers.templates.map((temp) => temp.fileName + " " + temp.type),
      ],
      ...clockers.table,
    ];

    console.log("Generated table data:", table);

    const ws = XLSX.utils.aoa_to_sheet(table);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    XLSX.writeFile(wb, `${typename.split("/")[1]}.xlsx`);
  } catch (err) {
    console.error("Error while processing dashboard export:", err);
  }
};
