import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CrissCrossIcon from "../../../../../assetModules/svgs/crissCross";

const sanitize = (input) => input.replace(/[/"]/g, "");
const AddClocker = () => {
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

  return (
    <div
    onClick={()=>{if(!isAdding)setIsAdding(true)}}
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
              : "rotate(0deg) translateX(-50%) translateY(15px) scale(1.1)",
          }}
        >
          <CrissCrossIcon color={"#D9D9D9"} size={!isAdding ? 1.5 : 0.8} />
        </div>
      </div>

      {isAdding && (
        <form style={{ width: "100%", marginTop: 10 }}>
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
            <option value="counter">counter</option>
            <option value="clockon">clockon</option>
            <option value="check in">check in</option>
            <option value="timer">timer</option>
          </select>

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
