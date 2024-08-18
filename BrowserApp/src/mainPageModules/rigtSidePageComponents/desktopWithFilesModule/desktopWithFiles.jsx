import { useEffect, useState } from "react";
import FileIcon from "./desktopWithFilesComponents/fileIcon";


const DesktopWithFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage).map((key) => {
      const [type, name] = key.split("/");
      return {
        name: name || key, 
        type: type || "file",
      };
    });
    setFiles(items);
  }, []); 

  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <div className="desktopWithFiles">
          {files.map((file, index) => (
            <FileIcon key={index} name={file.name} type={file.type} />
          ))}
            {/* <FileAdd/> */}

        </div>
      </div>
    </>
  );
};

export default DesktopWithFiles;
