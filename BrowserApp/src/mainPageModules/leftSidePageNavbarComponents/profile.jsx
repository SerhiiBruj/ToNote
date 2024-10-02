import EditProfile from "../../assetModules/svgs/editProfile";
import { useSelector } from "react-redux";
import  { memo, useState } from "react";
import unck from "../../assetModules/svgs/uncknown.svg";
import axios from "axios";
import CrissCrossIcon from "../../assetModules/svgs/crissCross";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [changes, setChanges] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarpath, setAvatarpath] = useState('');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]); // Зберігаємо файл у стані
    setChanges(true);
  };

  const changeEditProfile = () => {
    if (editProfile && changes && localStorage.getItem("token") && avatar) {
      const formData = new FormData();
      formData.append("avatar", avatar);

      axios
        .post("http://localhost:3000/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data", // Вказуємо тип контенту
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Додаємо токен для авторизації
          },
        })
        .then((res) => {
          setAvatarpath(`http://localhost:3000/profile-image/${userData.userName}.png`);
          console.log(res.data); // Виводимо відповідь сервера у консоль
        })
        .catch((err) => {
          console.error("Помилка завантаження файлу:", err); // Виводимо помилку у консоль
        });
    }
    setEditProfile(!editProfile);
  };


  return (
    <div className="profile">
      <div className="profileImgConteiner">
        <div
          className="profileImg"
          style={{
            backgroundSize: userData.imageUrl === null 
            ? (avatarpath ? "cover" : "70%") 
            : "cover",
          backgroundRepeat: "no-repeat",
          backgroundImage: userData.imageUrl !== null 
            ? `url(${userData.imageUrl})` 
            : avatarpath !== "" 
              ? `url(${avatarpath})` 
              : `url(${unck})`,
          backgroundPositionY: (userData.imageUrl === null && !avatarpath) 
            ? "bottom" 
            : "center",
          backgroundPositionX: "center",
          transform: "translateX(15px)"
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
          <div
            style={{
              width: "100%",
              transition: "0.2s all ease",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              opacity: editProfile ? "0.5" : "0",
              pointerEvents: "none",
              alignItems: "center",
            }}
          >
            <CrissCrossIcon color="white" size={1} />
          </div>
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
        {userData.hasUserData ? (
          <span>
            {userData.userName} <br />
            {userData.email}
          </span>
        ) : (
          "uncknown@zmil.com"
        )}
      </p>
    </div>
  );
};

export default memo(Profile);
