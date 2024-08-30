import { useEffect, useRef, useState } from "react";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../../../../redux/pagesSlice";

const sanitize = (input) => input.replace(/[/"]/g, "");
const FileAdd = () => {
  const dispatch = useDispatch();
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
    let currentDate = new Date();
    const initialData = (() => {
      switch (formData.fileType) {
        case "todo":
          return [];
        case "note":
          return "";
        case "table":
          return [
            ["", ""],
            ["", ""],
          ];
        case "checklist":
          return [];
        case "dashboard":
          return {
            templates: [],
            table: [
              [
                `${String(currentDate.getDate()).padStart(2, "0")}.${String(
                  currentDate.getMonth() + 1
                ).padStart(2, "0")}.${currentDate.getFullYear()}`,
              ],
            ],
          };
        default:
          return null;
      }
    })();
    const valueToStore = JSON.stringify(initialData);
    localStorage.setItem(
      `${formData.fileType}/${formData.fileName}`,
      valueToStore
    );
    setIsAdding(false);
    setFormData({ fileName: "", fileType: "note" });
    dispatch(updatePages());
  };

  return (
    <div
      onClick={() => setIsAdding(true)}
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
          onBlur={() => setIsAdding(false)}
          onClick={(e) => {
            e.stopPropagation();
            setIsAdding((prev) => !prev);
            setFormData({
              fileName: "",
              fileType: "note",
            });
          }}
          style={{
            display: "flex",
            height: "100%",
            transition: "all 0.6s ease",
            alignItems: "center",
            paddingRight: 20,
            transform: isAdding
              ? "rotate(45deg)"
              : "rotate(0deg) translateY(15px)  translateX(-20px)",
          }}
        >
          <CrissCrossIcon color={"#D9D9D9"} size={!isAdding ? 1.5 : 0.8} />
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

          <button type="submit" className="submit">
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default FileAdd;

{
  /* <div className="dropdown">
            <button
              className="btn btn-secondary dropdown-toggle fileType"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span>{formData.fileType}</span>
            </button>
            <ul className="dropdown-menu dropdown-menu-dark">
              <li>
                <a className="dropdown-item active" href="#">
                  Action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Separated link
                </a>
              </li>
            </ul>
          </div> */
}
