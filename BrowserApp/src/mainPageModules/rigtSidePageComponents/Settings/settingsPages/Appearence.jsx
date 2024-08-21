
const Appearence = () => {
  return (
    <div className="Appearence" style={{ padding: '20px' }}>
    <h2>Appearance Settings</h2>
    <p>Customize the look and feel of your ToNote app.</p>
    <div>
      <label>
        <strong>Theme:</strong>
        <select>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
    </div>
    <div style={{ marginTop: '20px' }}>
      <label>
        <strong>Font Size:</strong>
        <select>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>
    </div>
    <div style={{ marginTop: '20px' }}>
      <label>
        <strong>Background Image:</strong>
        <input type="file" />
      </label>
    </div>
    <button style={{ marginTop: '20px', padding: '10px 20px' }}>Save Changes</button>
  </div>
  )
}

export default Appearence
