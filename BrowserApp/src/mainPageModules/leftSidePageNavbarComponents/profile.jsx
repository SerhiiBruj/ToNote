import EditProfile from "../../assetModules/svgs/editProfile";
import { useSelector } from "react-redux";
import { memo, useState } from "react";
import unck from "../../assetModules/svgs/uncknown.svg";
import axios from "axios";
import CrissCrossIcon from "../../assetModules/svgs/crissCross";
import mylocalip from "../../../../mylocalip";

const Profile = () => {
  const [editProfile, setEditProfile] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [avatar, setAvatar] = useState(null);
  const [avatarpath, setAvatarpath] = useState("");
  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const changeEditProfile = () => {
    const token = localStorage.getItem("token");
    const beLocal = localStorage.getItem("beLocal");
    console.log(!!avatar);

    if (editProfile && token && avatar && !beLocal) {
      const formData = new FormData();
      formData.append("avatar", avatar);

      axios
        .post(`http://${mylocalip}:3000/upload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          const timestamp = new Date().getTime();
          setAvatarpath(
            `http://${mylocalip}:3000/profile-image/${userData.userName.replace(
              / /g,
              "%20"
            )}.png?${timestamp}`
          );
          console.log(res.data);
        })
        .catch((err) => {
          console.error("Помилка завантаження файлу:", err);
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
    backgroundSize: 
      userData.imageUrl 
      ? "cover" 
      : avatarpath 
        ? "cover" 
        : "70%",
    backgroundRepeat: "no-repeat",
    backgroundImage: (() => {
      if (userData.imageUrl) {
        const sessionUrl = sessionStorage.getItem("isLogged")?.split(" ")[2];
        return `url(${sessionUrl || userData.imageUrl})`;
      }
      return avatarpath ? `url(${avatarpath})` : `url(${unck})`;
    })(),
    backgroundPositionY: 
      userData.imageUrl 
      ? "center" 
      : avatarpath 
        ? "center" 
        : "100%",
    backgroundPositionX: "center",
    transform: "translateX(15px)",
  }}
>
          {editProfile && (
            <input
              type="file"
              name="avatar"
              accept=".jpg,.png"
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
            <CrissCrossIcon color="white" size={0.09} />
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
        {userData.hasUserData || sessionStorage.getItem("isLogged") ? (
          <span>
            {userData.userName} <br />
            {userData.email}
          </span>
        ) : (
          "unknown@zmil.com"
        )}
      </p>
    </div>
  );
};
const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.userData === nextProps.userData &&
    prevProps.avatarpath === nextProps.avatarpath
  );
};
export default memo(Profile, areEqual);
