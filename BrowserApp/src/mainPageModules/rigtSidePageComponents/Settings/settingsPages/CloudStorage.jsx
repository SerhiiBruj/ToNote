
const CloudStorage = () => {
  return (
    <div style={{ padding: '20px' }}>
    <h2>Cloud Storage</h2>
    <p>Manage your cloud storage options here.</p>
    <ul>
      <li>
        <strong>Enable Cloud Sync:</strong> Automatically back up your notes to the cloud.
      </li>
      <li>
        <strong>Storage Space:</strong> 5GB of 10GB used.
      </li>
      <li>
        <strong>Upgrade Plan:</strong> Click here to upgrade your storage plan.
      </li>
      <li>
        <strong>Connected Accounts:</strong> Google Drive, Dropbox.
      </li>
    </ul>
    <button style={{ marginTop: '20px', padding: '10px 20px' }}>Manage Storage</button>
  </div>
  );
};

export default CloudStorage;
