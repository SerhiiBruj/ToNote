import { memo, useCallback, useEffect, useRef, useState } from "react";
import CrissCrossIcon from "../../../../assetModules/svgs/crissCross";
import { useDispatch, useSelector } from "react-redux";
import { updatePages } from "../../../../redux/pagesSlice";
import CheckBox from "../../../../assetModules/noSvg/checkb";

const sanitize = (input) => input.replace(/[/"'\\%]/g, "");
const FileAdd = () => {
  const ref = useRef(null);
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const boolAnimate = useSelector((state) => state.startAnimation.value);
  const [formData, setFormData] = useState({
    fileName: "",
    fileType: "note",
    local: false,
  });

  useEffect(() => {
    if (ref.current && boolAnimate) {
      ref.current.style.transition = "all ease 0.5s";
      ref.current.style.opacity = "0%";
      ref.current.style.transform = "scale(0)";
    }
  }, [boolAnimate]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitize(value),
    }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
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
          case "diary":
            return [
              {
                date: `${String(currentDate.getDate()).padStart(
                  2,
                  "0"
                )}.${String(currentDate.getMonth() + 1).padStart(
                  2,
                  "0"
                )}.${currentDate.getFullYear()}`,
                value: "",
              },
            ];
          case "note":
            return "";
          case "table":
            return [
              [formData.fileName, ""],
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
      const storageKey = `${formData.fileType}/${formData.fileName}`;

      if (localStorage.getItem("beLocal") !== null || formData.local) {
        localStorage.setItem(storageKey, valueToStore);
      } else {
        sessionStorage.setItem(storageKey, valueToStore);
      }
      setIsAdding(false);
      setFormData({ fileName: "", fileType: "note" });
      dispatch(updatePages());
    },
    [formData.fileName, formData.fileType, formData.local]
  );

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
      <div className="upperside">
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

          <label
            htmlFor="fd"
            className="fileIconName"
            style={{
              fontSize: 25,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Save Locally
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                width: 50,
              }}
              onClick={() => {
                setFormData({
                  ...formData,
                  local: !formData.local,
                });
              }}
            >
              <CheckBox size={10} checked={formData.local} />
            </div>
          </label>

          <button type="submit" className="submit">
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default memo(FileAdd);
