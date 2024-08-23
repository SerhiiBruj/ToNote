const AccountSettings = () => {
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
          <select>
            <option value="en">English</option>
            <option value="ua">Ukrainian</option>
          </select>
        </label>
      </div>
      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Update Account
      </button>
    </div>
  );
};

export default AccountSettings;
