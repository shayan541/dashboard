import { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Card from "../components/Card";
import DropDown from "../components/ui/DropDown";

import type { ICity, IWeather } from "../types";
import { SettingContext } from "../store/SettingContext";
import { useCities } from "../hooks/useCities";
import { getWeather } from "../api/weather";

const Weather = () => {
  const { t } = useTranslation();
  const context = useContext(SettingContext);
  if (!context) throw new Error("context not exist");
  const { city } = context;

  const { cities, citiesInfo, error, loading } = useCities();
  const [selectedCity, setSelectedCity] = useState<string>(city);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [errorWeather, setErrorWeather] = useState<unknown>(null);
  const [weather, setWeather] = useState<IWeather | null>(null);

  const coords = useMemo(() => {
    if (!selectedCity) return null;
    if (!citiesInfo) return null;

    const info: ICity | undefined = citiesInfo.find((c) => c.city === selectedCity);
    if (!info) return null;
    const lat = Number(info.lat);
    const lng = Number(info.lng);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
    return { lat, lng };
  }, [selectedCity, citiesInfo]);

  useEffect(() => {
    if (!coords) return;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current_weather=true`;

    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      setLoadingWeather(true);
      try {
        const response = await getWeather(url, signal);

        setWeather(response.current_weather);
      } catch (error) {
        if (!axios.isCancel(error)) {
          console.error("Actual error: ", error);
          setErrorWeather(error);
        }
      } finally {
        setLoadingWeather(false);
      }
    })();
    return () => {
      controller.abort();
    };
  }, [coords]);

  if (loading) return <div>{t("loading_cities")}....</div>;
  if (error) return <div>{t("err_message")}</div>;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="min-w-[150px] max-w-[200px]">
        <DropDown label={t("city")} options={cities} value={selectedCity} onChange={(val) => setSelectedCity(val)} />
      </div>
      {loadingWeather && <div>{t("loading_weather")}...</div>}
      {!!errorWeather && <div>{t("error_weather")}...</div>}
      {!loadingWeather && !errorWeather && weather && (
        <div className="mt-4">
          <Card cityName={selectedCity} data={weather} />
        </div>
      )}
    </div>
  );
};

export default Weather;
