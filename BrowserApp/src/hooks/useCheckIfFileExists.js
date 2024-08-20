import { useSelector } from "react-redux";

const useCheckIfFileExists = (key) => {
    const pages = useSelector((state) => state.pages.value);
  return pages.includes(key);
};
export default useCheckIfFileExists