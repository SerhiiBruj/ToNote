import FileIcon from "./desktopWithFilesComponents/fileIcon";
import FileAdd from "./desktopWithFilesComponents/fileAdd";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { donotanimate } from "../../../redux/startAnimation";
import {FixedSizeGrid} from 'react-window';
const DesktopWithFiles = () => {
  const pages = useSelector((state) => state.pages.value);
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('useef')
    if (boolAnimate)
      setTimeout(() => {
        dispatch(donotanimate());
      }, 500);
  }, [boolAnimate]);
  
  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
     

        <div
          className="desktopWithFiles"
          style={{height:'fit-content',background:'none'}}
          
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

export default memo(DesktopWithFiles);
