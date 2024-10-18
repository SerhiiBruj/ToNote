import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useLocalStorage = (key, initialValue) => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyy = decodeURIComponent(key.replace(/(%20)/g, " "));
  const [isLocalItem, setIs] = useState(false);

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const sessionItem = window.sessionStorage.getItem(keyy);
      if (sessionItem) {
        return JSON.parse(sessionItem);
      }
      setIs(true);
      const localItem = window.localStorage.getItem(keyy);
      return localItem ? JSON.parse(localItem) : initialValue;
    } catch (error) {
      console.error("Помилка парсингу:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const sessionItem = window.sessionStorage.getItem(keyy);
      if (sessionItem) {
        setStoredValue(JSON.parse(sessionItem));
      } else {
        const localItem = window.localStorage.getItem(keyy);
        if (localItem) {
          setStoredValue(JSON.parse(localItem));
        } else {
          navigate("/404");
        }
      }
    } catch (error) {
      console.error("Помилка при отриманні даних:", error);
      setStoredValue(initialValue);
    }
  }, [location.pathname]);

  const setValue = (value) => {
    try {
      setStoredValue(value);
      isLocalItem ?
        window.localStorage.setItem(keyy, JSON.stringify(value))
        : window.sessionStorage.setItem(keyy, JSON.stringify(value))
    } catch (error) {
      console.error("Помилка при збереженні даних:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
