import UnknownUserIcon from "../../assetModules/svgs/unknownUser";
import EditProfile from "../../assetModules/svgs/editProfile";
import bg from "../../assetModules/noSvg/bg.jpg"; // Переконайтесь, що шлях до зображення правильний
import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import CrissCrossIcon from "../../assetModules/svgs/crissCross";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [changes, setChanges] = useState(false);
  const [avatar, setAvatar] = useState(null); // Стан для аватара

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Зберігаємо файл у стані
    setChanges(true);
  };

  const changeEditProfile = () => {
    // Перевірка умов перед виконанням POST запиту
    if (editProfile && changes && localStorage.getItem("token") && avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar); // Додаємо файл аватара до formData

      axios
        .post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Вказуємо тип контенту
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Додаємо токен для авторизації
          },
        })
        .then((res) => {
          console.log(res.data); // Виводимо відповідь сервера у консоль
        })
        .catch((err) => {
          console.error("Помилка завантаження файлу:", err); // Виводимо помилку у консоль
        });
    }
    // Перемикаємо режим редагування
    setEditProfile(!editProfile);
    // Виводимо новий стан editProfile у консоль
    console.log(editProfile);
  };

  return (
    <div className="profile">
      <div className="profileImgConteiner">
        <div
          className="profileImg"
          style={{
            backgroundImage: bg ? `url(${userData.imageUrl})` : null,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "translateX(15px)",
          }}
        >
          {editProfile && (
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              style={{
                opacity: "0",
                background: "none",
                border: "none",
                position: "absolute",
                borderRadius: "50%",
                width: "100%",
                height: "100%",
                outline: "none",
                cursor: "pointer",
              }}
            />
          )}
          {editProfile?userData.imageUrl ?<div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center", opacity:"0.5",pointerEvents:'none',alignItems:"center"}}> <CrissCrossIcon color="white"  size={1} /></div>: <div style={{width:"100%",height:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}> <CrissCrossIcon color="white"  size={1} /></div> :userData.imageUrl ?null: <UnknownUserIcon />}
        </div>
        <div
          style={{
            transform: "scale(0.7)",
          }}
          onClick={changeEditProfile}
        >
          <EditProfile color="#2e2e2e" allow={true} size={0.7} />
        </div>
      </div>
      <p
        className="profileEmail"
        style={{
          lineHeight: "1.3em",
          paddingBottom: "5px",
        }}
      >
        {userData.hasUserData
          ? <span>{userData.userName} <br />{userData.email}</span>
          : "uncknown@zmil.com"}
      </p>
    </div>
  );
};

export default Profile;
