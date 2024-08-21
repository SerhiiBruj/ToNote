import FileIcon from "./desktopWithFilesComponents/fileIcon";
import FileAdd from "./desktopWithFilesComponents/fileAdd";
import { useSelector } from "react-redux";

const DesktopWithFiles = () => {
  const pages = useSelector((state) => state.pages.value);


  
  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          className="desktopWithFiles"
        
        >
          {pages.map((page, index) => (
            <FileIcon
              key={index}
              name={page.split("/")[1]}
              type={page.split("/")[0]}
            />
          ))}
          <FileAdd />
        </div>
      </div>
    </>
  );
};

export default DesktopWithFiles;
