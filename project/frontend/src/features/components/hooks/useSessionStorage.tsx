import React, { useState, useEffect } from 'react'

type UseSessionStorage = <T>(key: string, defaultValue: T) => [T, React.Dispatch<React.SetStateAction<T>>]

const useSessionStorage: UseSessionStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const jsonValue = window.sessionStorage.getItem(key);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return defaultValue;
  });
  
  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(value));
  }, [value, setValue])

  return [value, setValue];
}

export default useSessionStorage