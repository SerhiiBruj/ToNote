import axios from "axios";
import { useSelector } from "react-redux";

const CloudStorage = () => {
  let testname = "checklist/Python"; // Переконайтеся, що це не undefined або null
  const pages = useSelector((state) => state.pages.value);

  const GCS = async () => {
    console.log("receiving");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/get-uploaded-file",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Використовуємо Bearer токен
          },
          params: {
            // Передача параметрів через URL
            fileName: testname,
          },
        }
      );

      console.log("received");
      console.log(response.data);
      for (let i = 0; i < response.data.userFiles.length; i++) {
        sessionStorage.setItem(
          response.data.userFiles[i].name,
          response.data.userFiles[i].value
        );
      }
      return response.data;
    } catch (er) {
      console.error(er);
    }
  };

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

      const response = await axios.post(
        "http://localhost:3000/upload-file",
        { file: arrayOfFiles },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Використовуємо Bearer токен
          },
        }
      );
      console.log(response);

      // Перевіряємо статус відповіді
      if (response.status !== 200) {
        console.log("Не вдалося завантажити файли.");
        return false;
      }

      console.log("Файли успішно завантажені!");
      return true;
    } catch (error) {
      console.error("Помилка під час завантаження файлів:", error);
    }
  };

  function calculateLocalStorageUsage() {
    let total = 0;
    for (let key in sessionStorage) {
      if (Object.prototype.hasOwnProperty.call(sessionStorage, key)) {
        total += (sessionStorage[key].length + key.length) * 2;
      }
    }
    return total;
  }
  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div className="settingsSection">
      <h1 style={{ fontSize: "40px" }}>Storage</h1>

      <div
        style={{
          userSelect: "none",
          background: "gray",
          width: "40%",
          padding: "10px",
          boxShadow: `inset white ${
            calculateLocalStorageUsage() / ((1024 * 1024 * 2) / 100)
          }px 0px 0px 0px`,
        }}
      >
        <span style={{ mixBlendMode: "difference" }}>
          Storage Space {formatBytes(calculateLocalStorageUsage())} of 10MB
          used.
        </span>
      </div>

      <h1 style={{ fontSize: "30px" }}>
        You also can use a cloud storage and use it via different devices.
      </h1>
      <span
        style={{ fontSize: "25px", cursor: "pointer", textDecoration: "underline" }}
        onClick={PCS}
      >
       Send your files to Cloud Storage
      </span>
      <br />
      <br />
      <span
        style={{ fontSize: "25px", cursor: "pointer", textDecoration: "underline" }}
        onClick={GCS}
      >
        Get your files from the Cloud Storage
      </span>
    </div>
  );
};

export default CloudStorage;
