/* eslint-disable react/prop-types */
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const BackLeafIcon = (props) => {
  const navigate = useNavigate();
  const pages = useSelector((state) => state.pages.value);
  const location=useLocation( );

  const PCS = async () => {
    console.log("sending");
    try {
      let arrayOfFiles = [];

      for (let i = 0; i < pages.length; i++) {
        arrayOfFiles.push({
          name: pages[i],
          value: sessionStorage.getItem(pages[i]),
        });
      }
      const token = localStorage.getItem("token");
      console.log(arrayOfFiles);

      const response = await axios.post(
        "http://localhost:3000/upload-file",
        { file: arrayOfFiles },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Використовуємо Bearer токен
          },
        }
      );

      // Перевіряємо статус відповіді
      if (response.status !== 200) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Помилка під час завантаження файлів:", error);
    }
  };
  return (
    <svg
     className="hoverSvg"
      onClick={() => {
        if (list.some((item) => item === location.pathname.split("/")[2])) {
          PCS();
        }
        navigate("/Home");
      }}
      width={props.size * 155}
      height={props.size * 78}
      viewBox="0 0 155 78"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M122.278 34.6667L155 26V31.2L122.278 43.3333V34.6667Z"
        fill={props.color}
      />
      <path
        d="M92.9999 0C132.611 -2.81016e-05 132.948 78 92.9999 78C41.3333 78 0 36.4 0 36.4C0 36.4 30.9999 3.46667 92.9999 0Z"
        fill={props.color}
      />
    </svg>
  );
};

export default BackLeafIcon;
const list = ["dashboard", "note", "checklist", "todo", "table"];