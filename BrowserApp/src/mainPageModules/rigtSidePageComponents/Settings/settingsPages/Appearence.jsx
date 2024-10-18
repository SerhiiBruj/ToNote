import { useState } from "react";

const Appearance = () => {
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
      <h1 >Appearance</h1>
      
      <div>
        <label className="labels">
          <strong>Font Size:</strong>
          <select className="submit" >
            <option value="medium">Medium</option>
            <option value="small">Small</option>
            <option value="large">Large</option>
          </select>
        </label>
      </div>
      <label className="labels" htmlFor="select" >
        <span>Animations</span>
        <select
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
          className="submit chbg"

          onClick={() => {
            document.getElementById("choosebg").click();
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
        <label className="labels">
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

export default Appearance;
