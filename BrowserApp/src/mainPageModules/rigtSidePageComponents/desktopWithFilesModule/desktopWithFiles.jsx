import  {  useState, useEffect, memo } from "react";
import FileIcon from "./desktopWithFilesComponents/fileIcon";
import FileAdd from "./desktopWithFilesComponents/fileAdd";
import { useSelector } from "react-redux";



const DesktopWithFiles = () => {
  const [boolAnimate, setBoolAnimate] = useState(false);

  const pages = useSelector((state) => state.pages.value);
  useEffect(() => {
    console.log("useEffect");

    if (boolAnimate) {
      setTimeout(() => {
        setBoolAnimate(false); 
      }, 500);
    }
  }, [boolAnimate, setBoolAnimate]);

  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div className="desktopWithFiles" style={{ height: "fit-content", background: "none" }}>
        {pages.map((page, index) => (
          <FileIcon setBoolAnimate={setBoolAnimate} boolAnimate={boolAnimate} key={index} name={page.split("/")[1]} type={page.split("/")[0]} />
        ))}
        <FileAdd setBoolAnimate={setBoolAnimate} boolAnimate={boolAnimate}  />
      </div>
    </div>
  );
};

export default memo(DesktopWithFiles);
