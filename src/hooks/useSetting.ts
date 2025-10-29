import { useEffect, useState } from "react";
import type { Setting } from "../types";

export function useSetting() {
  const [setting, setSetting] = useState<Setting>(() => {
    try {
      return JSON.parse(localStorage.getItem("setting") || "");
    } catch (error) {
      console.log(error);
      return { city: "Tehran", name: "", theme: "light" };
    }
  });

  useEffect(() => {
    if (setting.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [setting]);

  const saveChange = (data: Setting) => {
    setSetting(data);
    localStorage.setItem("setting", JSON.stringify(data));
  };
  return { setting, saveChange };
}
