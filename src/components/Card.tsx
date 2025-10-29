import React from "react";
import type { IWeather } from "../types";
import { useTranslation } from "react-i18next";

import { checkIsWindy } from "../utils/functions";

const Card: React.FC<{ data: IWeather | null; cityName: string }> = ({ data, cityName }) => {
  const { t } = useTranslation();

  return (
    <div className="border shadow border-gold-100 min-w-[150px] max-w-[200px] h-[200px] rounded flex justify-center items-center dark:border-black ">
      <ul className="text-center flex flex-col gap-6">
        <li className="font-bold">{cityName}</li>
        <li>
          {data?.temperature}
          <span>°C</span>
        </li>
        <li>{t(checkIsWindy(Number(data?.windspeed)) ?? "")}</li>
      </ul>
    </div>
  );
};

export default Card;
