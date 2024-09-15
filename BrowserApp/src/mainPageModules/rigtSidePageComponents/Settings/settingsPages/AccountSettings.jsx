import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const [lastTimeSeen, setLasttimeSeen] = useState([""]);
  const [isSeeinglastseens, SetIsSeeinglastseens] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const handleChangePassword = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (lastTimeSeen[0] === "") {
      const getLastTimeSeen = async () => {
        try {
          console.log("reqForLastTimeSeenData");
          const response = await axios.get("http://localhost:3000/entries", {
            headers: {
              userName: userData.userName,
            },
          });

          let arr = new Array(response.data.length);
          for (let i = 0; i < response.data.length; i++) {
            let { client_time } = response.data[i];
            const date = new Date(client_time);
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0"); // Місяці в JavaScript починаються з 0
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, "0");
            const minutes = String(date.getMinutes()).padStart(2, "0");
            const formattedDate = `${hours}:${minutes}  ${day}.${month}.${year}`;
            arr.push(formattedDate);
          }
          setLasttimeSeen(arr.filter((item) => item !== "").slice(0, 10));
        } catch (er) {
          console.log(er);
        }
      };
      getLastTimeSeen();
    }
  }, []);

  const navigate = useNavigate();
  return (
    <div className="settingsSection">
      <h1 style={{ fontSize: "40px" }}>Account Settings</h1>
      <p>
        Email: <strong>{userData?.email}</strong>
      </p>
      <p>
        Username: <strong>{userData?.userName}</strong>
      </p>
      <label
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        }}
      >
        <strong>Change password</strong>
        <div
          className="passwordChange"
          style={{ marginTop: "20px", display: "flex", alignItems: "center" }}
        >
          <input
            type="text"
            placeholder="Old password"
            name="oldPassword"
            style={{
              background: "lightgray",
              userSelect: "none",
              width: "fit-content",
              webkitTextSecurity: isPasswordVisible ? "none" : "disc",
            }}
            className="submit inputpas"
            value={passwords.oldPassword}
            onChange={(e) => handleChangePassword(e)}
          />
        </div>
        <input
          type="text"
          placeholder="New password"
          name="newPassword"
          style={{
            background: "lightgray",
            userSelect: "none",
            margin: "20px 0px 20px 0px",
            width: "fit-content",
            webkitTextSecurity: isPasswordVisible ? "none" : "disc",
          }}
          className="submit inputpas"
          value={passwords.newPassword}
          onChange={(e) => handleChangePassword(e)}
        />
      </label>

      {(passwords.newPassword || passwords.oldPassword) && <span
        style={{
          cursor: "pointer",
          textDecoration: "underline",
          width: "fit-content",
          userSelect: "none",
        }}
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? "Hide it" : "Make it visible"}
      </span>}
      <br />
      {passwords.newPassword && passwords.oldPassword && (
        <button
          className="submit"
          style={{
            marginTop: "20px",
            cursor: "pointer",
            width: "fit-content",
          }}
        >
          Change
        </button>
      )}
      <div className="lastTimeSeen">
        <br />
        <strong>Last time seen:</strong> {lastTimeSeen[0]}
        <br />
        <b
          style={{
            cursor: "pointer",
            lineHeight: "50px",
            textDecoration: "underline",
          }}
          onClick={() => SetIsSeeinglastseens(!isSeeinglastseens)}
        >
          {!isSeeinglastseens ? "Show  more attendance dates" : "Hide"}
        </b>
        <div
          style={{
            transform: !isSeeinglastseens ? "scaleY(0)" : "scaleY(1)",
            height: !isSeeinglastseens ? "0" : "auto",
            transition: "all ease 0.1s",
            opacity: !isSeeinglastseens ? "0" : "1",
            transformOrigin: "top",
            background: "#d3d3d31a",
            width: "fit-content",
            padding: "10px",
            borderRadius: "20px",
            outline: "1px solid gray",
          }}
        >
          {lastTimeSeen.map((time, index) => (
            <>
              <br />
              <span className="marker" key={index}>
                {time}
              </span>
            </>
          ))}
        </div>
      </div>
      <br />
      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          width: "fit-content",
        }}
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/authentification");
        }}
        className="submit"
      >
        Log out
      </button>
    </div>
  );
};

export default AccountSettings;
