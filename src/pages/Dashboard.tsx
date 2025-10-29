import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { getDayTimeMessage, timeFormat } from "../utils/functions";
import { getTime } from "../api/dashboard";
import { SettingContext } from "../store/SettingContext";
import { currentTimeUrl } from "../utils/const";

const Dashboard = () => {
  const context = useContext(SettingContext);
  if (!context) throw new Error("context not exist");
  const { name } = context;

  const { i18n, t } = useTranslation();

  const currentLocale = i18n.language === "fa" ? "fa-IR" : "en-GB";
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState<Date>(new Date());

  const timeMessage = getDayTimeMessage(time.getHours());
  const currentTime = timeFormat(time, currentLocale);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let isMounted = true;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      try {
        const response = await getTime(currentTimeUrl, signal);
        const serverTime = new Date(response.dateTime).getTime();
        const offset = serverTime - Date.now();
        if (isMounted)
          interval = setInterval(() => {
            setTime(new Date(Date.now() + offset));
          }, 1000);
      } catch (error) {
        if (isMounted) {
          console.log(error);
          interval = setInterval(() => {
            setTime(new Date(Date.now()));
          }, 1000);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      if (interval) clearInterval(interval);
      controller.abort();
    };
  }, []);

  if (loading) return <div>{t("loading")}....</div>;

  return (
    <div className="mt-12 font-bold text-4xl text-center">
      <div>{currentTime}</div>
      <div className="mt-12">
        {t(timeMessage)},<span className={`${i18n.language === "fa" ? "mr-2" : "ml-2"}`}>{name}</span>
      </div>
    </div>
  );
};

export default Dashboard;
