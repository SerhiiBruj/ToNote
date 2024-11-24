import { useState, useMemo, useEffect, } from "react";
import { useNavigate, useParams } from "react-router-dom";

const useLocalStorage = (type) => {
  const { name } = useParams()
  const navigate = useNavigate()
  const isLocal = useMemo(() => {
    if (localStorage.getItem(type + name)) return true;
    else if (sessionStorage.getItem(type + name)) return false
    else navigate("404")
  }, [navigate])
  const [fileValue, setFileValue] = useState(() => {
    try {
      if (isLocal) return JSON.parse(localStorage.getItem(type + name));
      else return JSON.parse(sessionStorage.getItem(type + name))
    } catch (er) {
      console.error(er);
      navigate("404")
    }
  })



  useEffect(() => {
    if (isLocal) setFileValue(JSON.parse(localStorage.getItem(type + name)))
    else if (!isLocal) setFileValue(JSON.parse(sessionStorage.getItem(type + name)))
    else navigate('/404')
  }, [name])

  const setValue = (value) => {
    setFileValue(value);
     if (isLocal) localStorage.setItem(type + name, JSON.stringify(fileValue))
    else sessionStorage.setItem(type + name, JSON.stringify(fileValue))
     console.log(JSON.stringify(fileValue))
  }

  return [fileValue, setValue]
};

export default useLocalStorage;
