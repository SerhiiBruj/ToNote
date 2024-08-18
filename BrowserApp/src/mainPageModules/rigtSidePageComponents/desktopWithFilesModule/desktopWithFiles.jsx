import { useEffect, useState } from "react";
import FileIcon from "./desktopWithFilesComponents/fileIcon";
import FileAdd from "./desktopWithFilesComponents/fileAdd";

const DesktopWithFiles = () => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage)
      .map((key) => {
        // Перевіряємо, чи ключ має формат "type/name"
        const [type, name] = key.split("/");
        if (type && name) {
          return { name, type };
        }
        return null; // Повертаємо null для ключів, які не відповідають формату
      })
      .filter((item) => item !== null); // Фільтруємо null значення

    setFiles(items);
    console.log(localStorage)
  }, [localStorage.length]);

  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <div className="desktopWithFiles">
          {files.map((file, index) => (
            <FileIcon key={index} name={file.name} type={file.type} />
          ))}
          <FileAdd />
        </div>
      </div>
    </>
  );
};

export default DesktopWithFiles;
