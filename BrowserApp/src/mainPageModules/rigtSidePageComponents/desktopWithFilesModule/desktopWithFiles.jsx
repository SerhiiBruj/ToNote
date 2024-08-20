import FileIcon from "./desktopWithFilesComponents/fileIcon";
import FileAdd from "./desktopWithFilesComponents/fileAdd";
import { useDispatch, useSelector } from "react-redux";
import { clearSelection, stopSelection } from "../../../redux/selectSlice";

const DesktopWithFiles = () => {
  const pages = useSelector((state) => state.pages.value);
  const dispatch = useDispatch();
 
  return (
    <>
      <div style={{ width: "100%", display: "flex" }}>
        <div
          className="desktopWithFiles"
          onClick={() => {
            dispatch(stopSelection());
            dispatch(clearSelection());
          }}
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
