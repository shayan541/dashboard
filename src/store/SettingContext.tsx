import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { ThemeType } from "../types";
import { useSetting } from "../hooks/useSetting";

interface SettingContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  name: string;
  setName: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setting, saveChange } = useSetting();
  const [theme, setTheme] = useState<ThemeType>(setting.theme);
  const [name, setName] = useState<string>(setting.name);
  const [city, setCity] = useState<string>(setting.city);

  useEffect(() => {
    const settingData = { name: name, city: city, theme: theme };
    saveChange(settingData);
  }, [theme, city, name]);

  return <SettingContext.Provider value={{ theme, setTheme, name, setName, city, setCity }}>{children}</SettingContext.Provider>;
};

export { SettingContext, SettingProvider };
