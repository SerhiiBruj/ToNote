const CloudStorage = () => {
  function calculateLocalStorageUsage() {
    let total = 0;
    for (let key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        total += (localStorage[key].length + key.length) * 2;
      }
    }
    return total;
  }
  const formatBytes = (bytes) => {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else if (bytes < 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  };

  return (
    <div className="settingsSection">
   <h1 style={{ fontSize: "40px" }}>Storage</h1>

      <div
        style={{
          userSelect: "none",
          background: "gray",
          width: "40%",
          padding: "10px",
          boxShadow: `inset white ${
            calculateLocalStorageUsage() / ((1024 * 1024 *2) / 100)
          }px 0px 0px 0px`,
        }}
      >
        <span style={{ mixBlendMode: "difference" }}>
          Storage Space {formatBytes(calculateLocalStorageUsage())} of 10MB
          used.
        </span>
      </div>
     
    </div>
  );
};

export default CloudStorage;
