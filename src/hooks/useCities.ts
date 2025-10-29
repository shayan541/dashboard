import { useEffect, useState } from "react";
import type { ICity, option } from "../types";
import { getCities } from "../api/profile";

export function useCities(url: string = "/ir.json") {
  const [cities, setCities] = useState<option[]>([]);
  const [citiesInfo, setCitiesInfo] = useState<ICity[]>([]);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCities(url);
        const citiesName = data.map((data: ICity) => ({ key: data.city, value: data.city }));
        setCitiesInfo(data);
        setCities(citiesName);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [url]);

  return { cities, citiesInfo, error, loading };
}
