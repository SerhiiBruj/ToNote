import { useState } from "react";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";

const FileAdd = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [fileName,setFileName]=useState('');
  const [fileType,setFileType]=useState('');
  const createFile= ()=>{
    localStorage.setItem(`${!fileType?'note':fileType}/${fileName}`,[]);
  }




  return (
    <div
      className="fileIconConteiner"
      style={{
        background: "#d9d9d980",
        height: isAdding && 300 ,
        width: isAdding &&340,
        transition: "all ease 0.6s",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          transition: "all ease 0.6s",
        }}
      >
        <span className="fileIconName">Add</span>
        <div
          onClick={() => setIsAdding((prev) => !prev)}
          style={{
            display: "flex",
            height: "100%",
            transition: "all ease 0.6s",
            alignItems: "center",
            paddingRight: 20,
            transform: isAdding
              ? "rotate(45deg)"
              : "rotate(0deg) translateY(25px) scale(1.2)",
          }}
        >
          <CrissCrossIcon size={!isAdding ? 1.5 : 0.8} />
        </div>
      </div>

      {isAdding && (
        <>

          <textarea
            placeholder="Enter text here"
            style={{ width: "100%", marginTop: 10 }}
            onChange={(e)=>setFileName(e.target.value)}
          />
          <select
            name="fileType"
            id="fileType"
            style={{ width: "100%", marginTop: 10 }}
            onChange={(e)=>setFileType(e.target.value)}

          >
            <option value="note">note</option>
            <option value="todo">todo</option>
            <option value="table">table</option>
            <option value="dashboard">dashboard</option>
            <option value="checklist">checklist</option>
            <option value="diary">diary</option>
          </select>
          <button  onClick={createFile}> Create</button>
        </>
      )}
    </div>
  );
};

export default FileAdd;
