import React, { useState, useEffect } from "react";

const ListOfFiles = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = Object.keys(localStorage).map((key) => ({
      key,
    }));
    setItems(items);
  }, []);

  return (
    <div className="listOfFiles">
      {items.map((item) => (
        <p key={item.key}>{item.key}</p>
      ))}
    </div>
  );
};

export default ListOfFiles;
