import React, { createContext, useEffect, useState, type ReactNode } from "react";
import type { Setting, ThemeType } from "../types";
import { useSetting } from "../hooks/useSetting";

interface SettingContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  name: string;
  setName: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  notifIsChecked: boolean;
  setNotifIsChecked: (val: boolean) => void;
}

const SettingContext = createContext<SettingContextType | undefined>(undefined);

const SettingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { setting, saveChange } = useSetting();
  const [theme, setTheme] = useState<ThemeType>(setting.theme);
  const [name, setName] = useState<string>(setting.name);
  const [city, setCity] = useState<string>(setting.city);
  const [notifIsChecked, setNotifIsChecked] = useState(setting.notifIsChecked);

  useEffect(() => {
    const settingData: Setting = { name: name, city: city, theme: theme, notifIsChecked: notifIsChecked };
    saveChange(settingData);
  }, [theme, city, name,notifIsChecked]);

  return (
    <SettingContext.Provider value={{ theme, setTheme, name, setName, city, setCity, setNotifIsChecked, notifIsChecked }}>
      {children}
    </SettingContext.Provider>
  );
};

export { SettingContext, SettingProvider };
