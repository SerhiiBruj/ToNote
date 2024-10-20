/* eslint-disable react/prop-types */
import { useState } from "react";
import CrissCrossIcon from "../../../../../assetModules/svgs/crissCross";

const AddClocker = ({ clockers, setClockers }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    fileName: "",
    type: "counter", 
    goal: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fileName.trim() === "") return;

    const newTemplate = {
      fileName: formData.fileName,
      type: formData.type || "counter", // Ensure type defaults to "counter"
      goal: formData.goal,
      dateOfStart: new Date().toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };

    const newTable = clockers.table.map((row) => {
      switch (formData.type) {
        case "clock on":
        case "timer":
          return [...row, []];
        case "check in":
          return [...row, false];
        case "counter":
        default:
          return [...row, 0];
      }
    });

    setClockers({
      templates: [...clockers.templates, newTemplate],
      table: newTable,
    });

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      fileName: "",
      type: "counter", // Reset to "counter" instead of "note"
      goal: "",
    });
    setIsAdding(false);
  };

  return (
    <div
      onClick={() => {
        if (!isAdding) setIsAdding(true);
      }}
      className="fileIconConteiner addFile"
      style={{
        height: isAdding && 500,
        width: isAdding && 400,
      }}
    >
      <div className="upperside" style={{}}>
        <span className="fileIconName">Add</span>

        <div
          onClick={() => {
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
              : "rotate(0deg)  translateY(15px) scale(1.1)",
          }}
        >
          <CrissCrossIcon color={"#D9D9D9"} size={!isAdding ? 1.5 : 0.8} />
        </div>
      </div>

      {isAdding && (
        <form style={{ width: "100%", marginTop: 10 }} onSubmit={handleSubmit}>
          <input
            className="fileName"
            name="fileName"
            placeholder="Name"
            value={formData.fileName}
            onChange={handleChange}
            required
          />
          <select
            className="fileType"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="counter">counter</option>
            <option value="clock on">clock on</option>
            <option value="check in">check in</option>
            <option value="timer">timer</option>
          </select>
          <input
            className="fileName"
            name="goal"
            placeholder="Goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />
          <button type="submit" className="submit">
            Create
          </button>
        </form>
      )}
    </div>
  );
};

export default AddClocker;
