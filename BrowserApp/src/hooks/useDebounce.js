import { useState, useEffect, useCallback } from "react";

/**
 * Custom hook to debounce a value or function.
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The debounce delay in milliseconds.
 * @returns {Function} - The debounced function.
 */
const useDebounce = (callback, delay) => {
  const [debouncedCallback, setDebouncedCallback] = useState(() => callback);

  useEffect(() => {
    setDebouncedCallback(() => callback);
  }, [callback]);

  return useCallback(
    (...args) => {
      const handler = setTimeout(() => {
        debouncedCallback(...args);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    },
    [debouncedCallback, delay]
  );
};

export default useDebounce;