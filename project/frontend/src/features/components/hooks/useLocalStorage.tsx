import React, { useState, useEffect } from 'react'

type UseLocalStorage = <T>(key: string, defaultValue: T) => [T, React.Dispatch<React.SetStateAction<T>>]

const useLocalStorage: UseLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.localStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });
  
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue])

  return [value, setValue];
}

export default useLocalStorage