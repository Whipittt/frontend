import { useState, useEffect } from "react";

/**
 * A hook to sync state with sessionStorage.
 * @param key - The sessionStorage key
 * @param initialValue - The default value if nothing is saved
 */
export function useSessionStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = sessionStorage.getItem(key);
      return saved ? (JSON.parse(saved) as T) : initialValue;
    } catch (err) {
      console.error("Error reading sessionStorage key:", key, err);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error("Error setting sessionStorage key:", key, err);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
