import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useLocalStorage = (key, initialValue) => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyy = decodeURIComponent(key.replace(/(%20)/g, " "));

  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(keyy);
      // Перевірка чи item існує та чи це дійсно JSON
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Помилка парсингу:", error);
      return initialValue;
    }
  });

  // Виконується при зміні шляху
  useEffect(() => {
    try {
      const item = window.sessionStorage.getItem(keyy);
      if (item) {
        setStoredValue(JSON.parse(item));
      } else {
        navigate("/404");
      }
    } catch (error) {
      console.error("Помилка при отриманні даних з sessionStorage:", error);
      setStoredValue(initialValue);
    }
  }, [location.pathname]);

  // Функція для встановлення нового значення
  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.sessionStorage.setItem(keyy, JSON.stringify(value));
    } catch (error) {
      console.error("Помилка при збереженні даних до sessionStorage:", error);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
