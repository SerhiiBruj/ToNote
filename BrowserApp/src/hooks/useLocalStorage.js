import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const useLocalStorage = (key) => {
  const navigate = useNavigate()
  const isLocal = useMemo(() => {
    if (localStorage.getItem(key)) return true;
    else if (sessionStorage.getItem(key)) return false
    else navigate("404")
  }, [navigate])
  const [fileValue, setFileValue] = useState(() => {
    try {
      if (isLocal) return JSON.parse(localStorage.getItem(key));
      else return JSON.parse(sessionStorage.getItem(key))
    } catch (er) {
      console.error(er);
      navigate("404")
    }
  })

  useEffect(() => {
    if (isLocal) setFileValue(JSON.parse(localStorage.getItem(key)))
    else if (!isLocal) setFileValue(JSON.parse(sessionStorage.getItem(key)))
    else navigate('/404')

    return () => {

    }
  }, [navigate])

  const setValue = (value) => {
    setFileValue(value);
    if (debounce) clearTimeout(debounce);
    var debounce = setTimeout(() => {
      if (isLocal) {
        window.localStorage.setItem(key, JSON.stringify(value));
      } else {
        window.sessionStorage.setItem(key, JSON.stringify(value));
      }
    }, 1000)

  }

  return [fileValue, setValue]
};

export default useLocalStorage;
