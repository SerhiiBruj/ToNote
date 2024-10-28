import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useLocalStorage = (key, initialValue) => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyDecoded = decodeURIComponent(key.replace(/(%20)/g, " "));

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const localItem = window.localStorage.getItem(keyDecoded);
      if (localItem) return JSON.parse(localItem); // Повертаємо дані з localStorage, якщо є

      const sessionItem = window.sessionStorage.getItem(keyDecoded);
      return sessionItem ? JSON.parse(sessionItem) : initialValue; // Повертаємо дані з sessionStorage, якщо є
    } catch (error) {
      console.error("Помилка парсингу:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      const sessionItem = window.sessionStorage.getItem(keyDecoded);
      if (sessionItem) {
        setStoredValue(JSON.parse(sessionItem));
      } else {
        const localItem = window.localStorage.getItem(keyDecoded);
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

      // Якщо дані вже є в localStorage, оновлюємо його
      const existsInLocalStorage = window.localStorage.getItem(keyDecoded) !== null;

      // Якщо дані не існують у localStorage, зберігаємо їх у sessionStorage
      if (!existsInLocalStorage) {
        window.sessionStorage.setItem(keyDecoded, JSON.stringify(value));
      } else {
        // В іншому випадку, зберігаємо в localStorage
        window.localStorage.setItem(keyDecoded, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Помилка при збереженні даних:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
