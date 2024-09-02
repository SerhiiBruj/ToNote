import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useLocalStorage = (key, initialValue) => {
  let keyy = decodeURIComponent(key.replace(/(%20)/g, " "));
  const navigate = useNavigate();

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(keyy);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const item = window.localStorage.getItem(keyy);

  useEffect(() => {
    if (!item) {
      navigate("/404");
    }
  }, [key, navigate]);

  const setValue = (value) => {
    try {
      if (item) {
        setStoredValue(value);
        window.localStorage.setItem(keyy, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
