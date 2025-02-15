import { useEffect, useState } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Ошибка чтения из localStorage:", error);
      return initialValue;
    }
  });

  // Обновляем localStorage при изменении значения
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Ошибка записи в localStorage:", error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}

export default useLocalStorage;
