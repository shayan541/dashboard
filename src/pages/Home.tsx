import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { SettingContext } from "../store/SettingContext";


const Home = () => {
  const { t } = useTranslation();

  const context = useContext(SettingContext);
  if (!context) throw new Error("context not exist");
  const { name } = context;

  return <div className="flex justify-center items-center">{name ? t("welcome_home_page") : t("name_is_empty_msg")}</div>;
};

export default Home;
