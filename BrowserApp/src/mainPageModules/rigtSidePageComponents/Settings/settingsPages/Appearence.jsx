import { useState } from "react";

const Appearence = () => {
  const [bg, setBg] = useState(
    localStorage.getItem("bg") ? localStorage.getItem("bg") : ""
  );
  const [animations, setAnimations] = useState(true);
  const [changes, setChanges] = useState(false);
  const saveChanges = () => {
    if (bg) {
      localStorage.setItem("bg", bg); // Збереження base64 рядка
      console.log("bg is uploaded");
    }
    if (changes) {
      localStorage.setItem("animations", animations);
    }

    console.log("settings saved");
  };
  return (
    <div className="settingsSection">
      <h1 style={{ fontSize: "40px" }}>Account Settings</h1>
      <div></div>
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Font Size:</strong>
          <br />
          <select className="submit" style={{ width: "fit-content" }}>
            <option value="medium">Medium</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
      <label htmlFor="select">
        <span>Animations</span>
        <br />
        <select
          style={{ marginTop: "20px" }}
          className="submit"
          onChange={(e) => {
            setAnimations(e.target.value === "true");
            setChanges(true);
          }}
        >
          <option value="true">Animations</option>
          <option value="false">No Animations</option>
        </select>
      </label>

      <div style={{ marginTop: "20px" }}>
        <strong>Background Image:</strong> <br />
        <div
          className="submit"
          onClick={() => {
            document.getElementById("choosebg").click();
          }}
          style={{
            cursor: "pointer",
            width: "fit-content",
            padding: "0px 10px 0px 10px",
            display: "flex",
            alignItems: "center",
            background: "gray",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          Choose your background
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  setBg(reader.result); // Збереження base64 у стані
                };
                reader.readAsDataURL(file); // Читання файлу як Data URL
              }
              setChanges(true);
            }}
            type="file"
            id="choosebg"
            name="bg"
            style={{
              display: "none",
            }}
          />
        </div>
        {bg && (
          <button
            onClick={() => {
              localStorage.removeItem("bg");
            }}
            style={{ marginTop: "20px", width: "fit-content" }}
            className="submit"
          >
            Delete bg image
          </button>
        )}
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Language:</strong>
          <br />
          <select className="submit" style={{ width: "fit-content" }}>
            <option value="en">English</option>
            <option value="ua">Ukrainian</option>
          </select>
        </label>
      </div>
      <button
        className="submit"
        onClick={() => {
          saveChanges();
          setChanges(false);
        }}
        style={{
          background: changes ? "brown" : "gray",
          cursor: "pointer",
          transition: "all 0.5s ease",
          width: "fit-content",
          marginTop: "20px",
          padding: "10px 20px",
        }}
      >
        Save Changes
      </button>
    </div>
  );
};

export default Appearence;
