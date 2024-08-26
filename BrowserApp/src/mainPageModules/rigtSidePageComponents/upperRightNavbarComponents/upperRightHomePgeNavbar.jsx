import { useEffect, useState } from "react";
import LogoIcon from "../../../assetModules/svgs/logo";
import ShareIcon from "../../../assetModules/svgs/share";
import BinIcon from "../../../assetModules/svgs/bin";
import PenIcon from "../../../assetModules/svgs/pen";
import { useDispatch, useSelector } from "react-redux";
import isEditable, { edit, editPayload } from "../../../redux/isEditable";
import BackLeafIcon from "../../../assetModules/svgs/backLeaf";
import { NavLink, useLocation } from "react-router-dom";
import StartSelection from "../../../assetModules/noSvg/startSelections";
import { updatePages } from "../../../redux/pagesSlice";
import {
  clearSelection,
  startSelection,
  stopSelection,
} from "../../../redux/selectSlice";
import * as XLSX from "xlsx";
let listOfFileTypes = ["dashboard", "note", "checklist", "todo", "table"];

const UpperRightHomePgeNavbar = () => {
  const { isSelecting, selected } = useSelector((state) => state.select);
  const [page, setPage] = useState("");
  const [isHome, setIsHome] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[3]) {
      setIsHome(false);
      setPage(location.pathname.split("/")[3]);
    } else {
      setPage(location.pathname.split("/")[1]);
      setIsHome(true);
    }
  }, [location.pathname]);

  const deleteFile = () => {
    if (isSelecting) {
      if (selected.length > 0) {
        for (let file of selected) {
          localStorage.removeItem(file);
        }
        dispatch(updatePages(Object.keys(localStorage)));
        dispatch(stopSelection());
        dispatch(clearSelection());
      } else {
        dispatch(stopSelection());
        dispatch(clearSelection());
      }
    } else {
      dispatch(startSelection());
    }
  };
  const exportFile = () => {
    if (isHome) {
      if (isSelecting) {
        if (selected.length > 0) {
          for (let i of selected) {
            if (i.split("/")[0] === "note" && localStorage.getItem(i)) {
              const text = JSON.parse(localStorage.getItem(i), null, 2);
              const blob = new Blob([text], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${i.split("/")[0]}.txt`;
              link.click();
              URL.revokeObjectURL(url);
            }
            if (i.split("/")[0] === "todo" && localStorage.getItem(i)) {
              const todos = JSON.parse(localStorage.getItem(i)).join("\n");
              const blob = new Blob([todos], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${i.split("/")[0]}.txt`;
              link.click();
              URL.revokeObjectURL(url);
            }
            if (i.split("/")[0] === "checklist" && localStorage.getItem(i)) {
              const checklists = JSON.parse(localStorage.getItem(i))
                .map(
                  (checklist) =>
                    `${checklist.p}\n\t${checklist.desc.join("\n\t")}`
                )
                .join("\n\n");
              const blob = new Blob([checklists], { type: "text/plain" });
              const url = URL.createObjectURL(blob);
              const link = document.createElement("a");
              link.href = url;
              link.download = `${i.split("/")[0]}.txt`;
              link.click();
              URL.revokeObjectURL(url);
            }
            if (i.split("/")[0] === "table" && localStorage.getItem(i)) {
              const ws = XLSX.utils.aoa_to_sheet(
                JSON.parse(localStorage.getItem(i))
              );
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
              XLSX.writeFile(wb, `${i.split("/")[0]}.xlsx`);
            }
            if (i.split("/")[0] === "dashboard" && localStorage.getItem(i)) {
              const ws = XLSX.utils.aoa_to_sheet(
                JSON.parse(
                  localStorage.getItem(
                    `dashboard/${location.pathname.split("/")[3]}`
                  )
                ).table.map((row) =>
                  row.map((td) => (Array.isArray(td) ? td.join(", ") : td))
                )
              );
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
              XLSX.writeFile(wb, `${i.split("/")[0]}.xlsx`);
            }
            console.log(i);
          }
        }
        dispatch(stopSelection());
        dispatch(clearSelection());
      } else {
        dispatch(startSelection());
      }
    } else if (listOfFileTypes.includes(location.pathname.split("/")[2])) {
      switch (location.pathname.split("/")[2]) {
        case "note":
          {
            const text = JSON.parse(
              localStorage.getItem(`note/${location.pathname.split("/")[3]}`),
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
              localStorage.getItem(
                `checklist/${location.pathname.split("/")[3]}`
              )
            )
              .map(
                (checklist) =>
                  `${checklist.p}\n\t${checklist.desc.join("\n\t")}`
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
              localStorage.getItem(`todo/${location.pathname.split("/")[3]}`)
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
                localStorage.getItem(`table/${location.pathname.split("/")[3]}`)
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
                localStorage.getItem(
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
  };
  return (
    <div className="upperRightHomePageNavbar">
      <div
        style={{
          transition: "all ease 0.5s",
          opacity: !isHome ? "1" : "0",
          transform: !isHome ? "scale(1)" : "scale(0)",
        }}
        onClick={() => {
          dispatch(editPayload(false));
        }}
      >
        <BackLeafIcon size={0.8} color={"#2e2e2e"} />
      </div>

      <div>
        <h1 className="Name">
          {decodeURIComponent(page.replace(/(%20|_)/g, " "))}
        </h1>
      </div>

      <div className="upperRightRightsectionHomePageNavbar">
        {location.pathname.split("/")[2] === "dashboard" && (
          <NavLink to={`dashboardTable/${location.pathname.split("/")[3]}`}>
            table
          </NavLink>
        )}
        <div
          style={{
            transition: "all ease 0.2s",
            transform: isHome ? "none" : "scale(0)",
            opacity: isHome ? 1 : 0,
          }}
        >
          <StartSelection />
        </div>
        <div
          className="peni  "
          onClick={() => {
            dispatch(edit());
            if (isSelecting) {
              dispatch(stopSelection());
              dispatch(clearSelection());
            }
          }}
        >
          <PenIcon size={0.9} color="#2e2e2e" roll={isEditable} />
        </div>
        <div onClick={deleteFile}>
          <BinIcon size={1} color="#2e2e2e" />
        </div>
        <div onClick={exportFile}>
          <ShareIcon size={1} color={"#2e2e2e"} />
        </div>
        <div style={{ marginTop: "4%" }}>
          <LogoIcon />
        </div>
      </div>
    </div>
  );
};

export default UpperRightHomePgeNavbar;
