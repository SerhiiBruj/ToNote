import { useEffect, useRef, useState } from "react";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";
import { useSelector } from "react-redux";

const sanitize = (input) => input.replace(/[/"]/g, '');
const FileAdd = () => {
  const [isAdding, setIsAdding] = useState(false);
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const [formData, setFormData] = useState({
    fileName: "",
    fileType: "note",
  });

  const ref = useRef(null);
  useEffect(() => {
    if (boolAnimate) ref.current.style.animation = " fade 0.6s ease-out";
  }, [boolAnimate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitize(value),
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fileName.trim() === "") {
      alert("Please enter a file name");
      return;
    }
    localStorage.setItem(`${formData.fileType}/${formData.fileName}`, []);
    setIsAdding(false);
    setFormData({ fileName: "", fileType: "note" });
  };

  return (
    <div
      ref={ref}
      className="fileIconConteiner addFile"
      style={{
        height: isAdding && 300,
        width: isAdding && 340,
      }}
    >
      <div className="upperside" style={{}}>
        <span className="fileIconName">Add</span>
        <div
          onClick={() => setIsAdding((prev) => !prev)}
          style={{
            display: "flex",
            height: "100%",
            transition: "all 0.6s ease",
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
        <form onSubmit={handleSubmit} style={{ width: "100%", marginTop: 10 }}>
          <input
          className="fileName"
            name="fileName"
            placeholder="Name"
            value={formData.fileName}
            onChange={handleChange}
          />
          <select
          className="fileType"
            name="fileType"
            value={formData.fileType}
            onChange={handleChange}
          >
            <option value="note">note</option>
            <option value="todo">todo</option>
            <option value="table">table</option>
            <option value="dashboard">dashboard</option>
            <option value="checklist">checklist</option>
            <option value="diary">diary</option>
          </select>
          <button type="submit" className="submit">Create</button>
        </form>
      )}
    </div>
  );
};

export default FileAdd;
