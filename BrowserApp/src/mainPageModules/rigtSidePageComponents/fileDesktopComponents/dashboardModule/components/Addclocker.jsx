import { useState } from "react";
import CrissCrossIcon from "../../../../../assetModules/svgs/crissCross";

const sanitize = (input) => input.replace(/[/"]/g, "");
const AddClocker = () => {
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "note",
    goal: "1",
  });

  


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: sanitize(value),
    }));
  };

  return (
    <div
    onClick={()=>{if(!isAdding)setIsAdding(true)}}
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
        <form style={{ width: "100%", marginTop: 10 }}>
          <input
            className="fileName"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            className="fileType"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="counter">counter</option>
            <option value="clockon">clockon</option>
            <option value="check in">check in</option>
            <option value="timer">timer</option>
          </select>
          <input
            className="fileName"
            name="goal"
            placeholder="Goal"
            value={formData.goal}
            onChange={handleChange}
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



// function getLocalStorageSize() {
//     let totalSize = 0;
//     for (let key in localStorage) {
//       if (localStorage.hasOwnProperty(key)) {
//         let itemSize = (localStorage[key].length + key.length) * 2; // Вимірюємо кількість символів у ключі та значенні (по 2 байти на кожен символ)
//         totalSize += itemSize;
//       }
//     }
//     console.log(`Local Storage зайнято: ${totalSize} байтів`);

//     return ; 
//   }
    // getLocalStorageSize();



    