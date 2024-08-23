const CloudStorage = () => {
  function calculateLocalStorageUsage() {
    let total = 0;

    for (let key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }

    const formatBytes = (bytes) => {
      if (bytes < 1024) {
        return `${bytes} B`;
      } else if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
      } else if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
      } else {
        return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
      }
    };

    return formatBytes(total);
  }

  return (
    <div className="settingsSection">
      <h2>Cloud Storage</h2>
      <p>Manage your cloud storage options here.</p>
      <ul>
        <li>
          Storage Space {calculateLocalStorageUsage()} of 10GB used.
        </li>
        <li>Upgrade Plan Click here to upgrade your storage plan.</li>
        <li>Connected Accounts Google Drive, Dropbox.</li>
      </ul>
      <button style={{ marginTop: "20px", padding: "10px 20px" }}>
        Manage Storage
      </button>
    </div>
  );
};

export default CloudStorage;
