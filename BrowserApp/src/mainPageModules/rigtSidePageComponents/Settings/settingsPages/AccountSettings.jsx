import { useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const navigate = useNavigate();
  return (
    <div className="settingsSection">
      <h2>Account Settings</h2>
      <p>Manage your account details and preferences.</p>
      <div>
        <label>
          <strong>Email:</strong>
          <input type="email" placeholder="youremail@example.com" />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Password:</strong>
          <input type="password" placeholder="********" />
        </label>
      </div>
      <div style={{ marginTop: "20px" }}>
        <label>
          <strong>Language:</strong>
          <select className="submit" style={{width:'fit-content'}}>
            <option value="en">English</option>
            <option value="ua">Ukrainian</option>
          </select>
        </label>
      </div>
      <button
        className="submit"
        style={{ marginTop: "20px", padding: "10px 20px" ,width:'fit-content'}}
      >
        Update Account
      </button>
      <br />
      <button
        style={{ marginTop: "20px", padding: "10px 20px",width:'fit-content' }}
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
