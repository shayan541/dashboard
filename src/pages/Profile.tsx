import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";

import DropDown from "../components/ui/DropDown";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";

import { useCities } from "../hooks/useCities";
import { SettingContext } from "../store/SettingContext";
import type { ThemeType } from "../types";
import { toast, Toaster } from "sonner";

const Profile = () => {
  const { t } = useTranslation();

  const context = useContext(SettingContext);
  if (!context) throw new Error("context not exist");
  const { setTheme, setName, setCity, city, name, theme } = context;

  const [themeState, setThemeState] = useState(theme);
  const [nameState, setNameState] = useState(name);
  const [selectedCity, setSelectedCity] = useState(city);

  const { cities } = useCities();

  const saveHandler = () => {
    setName(nameState);
    setTheme(themeState);
    setCity(selectedCity);
    toast.success(t("success_process"));
  };

  return (
    <div className="w-[200px] flex flex-col gap-4">
      <Toaster position="top-center" richColors dir="rtl" />
      <Input
        label={t("name")}
        value={nameState}
        onChange={(e) => {
          setNameState(e.target.value);
        }}
      />
      <DropDown
        value={themeState}
        onChange={(val) => {
          setThemeState(val as ThemeType);
        }}
        label={t("theme")}
        options={[
          { key: "dark", value: t("dark") },
          { key: "light", value: t("light") },
        ]}
      />
      <DropDown value={selectedCity} onChange={(val) => setSelectedCity(val)} label={t("city")} options={cities} />

      <div className="mt-4 flex justify-center">
        <Button onClick={saveHandler}>{t("save")}</Button>
      </div>
    </div>
  );
};

export default Profile;
