import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import mylocalip from "../../../../../../mylocalip";

const AccountSettings = () => {
  const [lastTimeSeen, setLasttimeSeen] = useState([""]);
  const [isSeeinglastseens, SetIsSeeinglastseens] = useState(false);
  const userData = useSelector((state) => state.userData);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwords, setPasswords] = useState({
    oldPassword: "fdsfs",
    newPassword: "fdsfd",
  });

  const handleChangePassword = useCallback((e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }, []);

  useEffect(() => {
    if (lastTimeSeen[0] === "" && !localStorage.getItem("beLocal")) {
      const getLastTimeSeen = async () => {
        try {
          console.log("reqForLastTimeSeenData");
          const response = await axios.get("http://"+mylocalip+":3000/entries", {
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
      <h1>Account Settings</h1>
      <p>
        Email: <strong>{userData?.email}</strong>
      </p>
      <p>
        Username: <strong>{userData?.userName}</strong>
      </p>
      <label>
        <strong>Change password</strong>
        <div id="passwordChange">
          <input
            type="text"
            placeholder="Old password"
            name="oldPassword"
            style={{
           
              WebkitTextSecurity: isPasswordVisible ? "none" : "disc",
            }}
            className="submit inputpas "
            value={passwords.oldPassword}
            onChange={(e) => handleChangePassword(e)}
          />
        <input
          type="text"
          placeholder="New password"
          name="newPassword"
          style={{
            WebkitTextSecurity: isPasswordVisible ? "none" : "disc",
          }}
          className="submit inputpas"
          value={passwords.newPassword}
          onChange={(e) => handleChangePassword(e)}
        />
        </div>

      </label>

      {(passwords.newPassword || passwords.oldPassword) && (
        <span
          className="hideshow"
        
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? "Hide it" : "Make it visible"}
        </span>
      )}
      <br />
      {passwords.newPassword && passwords.oldPassword && (
        <button
          className="submit"
          id="changepass"
        
        >
          Change
        </button>
      )}
      <div className="lastTimeSeen">
        <br />
        <strong>Last time seen:</strong> {lastTimeSeen[0]}
        <br />
        <b
        id="showlogins"
         
          onClick={() => SetIsSeeinglastseens(!isSeeinglastseens)}
        >
          {!isSeeinglastseens ? "Show  more attendance dates" : "Hide"}
        </b>
        <div
        id="logshidsh"
          style={{
            transform: !isSeeinglastseens ? "scaleY(0)" : "scaleY(1)",
            height: !isSeeinglastseens ? "0" : "auto",
            opacity: !isSeeinglastseens ? "0" : "1",
          }}
        >
          {lastTimeSeen.map((time, index) => (
            <div key={index}>
              <span className="marker">{time}</span>
            </div>
          ))}
        </div>
      </div>
      <br />
      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/authentification");
        }}
        className="submit logout"
      >
        Log out
      </button>
    </div>
  );
};

export default AccountSettings;
