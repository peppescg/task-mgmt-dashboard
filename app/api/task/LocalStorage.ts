"use client";

export const LocalStorage = (key: string) => {
  const get = () => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : undefined;
    } catch {
      //   noop
    }
  };

  const set = (value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  };

  return { get, set };
};
