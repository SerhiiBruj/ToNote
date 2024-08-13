import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FileIcon from "./desktopWithFilesComponents/fileIcon";
import Content from "../fileDesktopComponents/noteModule/note";
import Todo from "../fileDesktopComponents/todoModule/todo";
import ChecklistModule from "../fileDesktopComponents/сheckListModule/checklist";
import Table from "../fileDesktopComponents/tableModule/table";
import { edit, editPayload } from "../../../redux/isEditable";

const DesktopWithFiles = () => {
  return (
    <>
   
      <div  style={{ width: "100%", display: "flex" }}>
        <div className="desktopWithFiles">
          <FileIcon name={"Plans"} type={"note"} />
          <FileIcon name={"name"} type={"todo"} />
          <FileIcon name={"type"} type={"table"} />
          <FileIcon name={"v"} type={"dashboard"} />
          <FileIcon name={"div"} type={"checklist"} />
          <FileIcon name={"Development"} type={"diary"} />
          
        </div>

      </div>
    </>
  );
};

export default DesktopWithFiles;
