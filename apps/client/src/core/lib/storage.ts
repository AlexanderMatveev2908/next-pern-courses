import { StorageKey } from "@/common/types/storage";

export const saveStorage = <T>(key: StorageKey, data: T): void =>
  sessionStorage.setItem(
    key,
    typeof data === "string" ? data : JSON.stringify(data),
  );

export const getStorage = <T>(key: StorageKey): T | null => {
  if (typeof window === "undefined") return null;

  const data = sessionStorage.getItem(key);

  if (!data || data === "null") return null;

  try {
    return JSON.parse(data);
  } catch {
    return data as T;
  }
};

export const delStorage = (key: StorageKey) => sessionStorage.removeItem(key);
