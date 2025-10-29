export interface ICity {
  city: string;
  lat: string;
  lng: string;
  country: string;
  iso2: string;
  admin_name: string;
  capital: string;
  population: string;
  population_proper: string;
}

export type option = { key: string; value: string };

export type ThemeType = "dark" | "light";

export type Setting = {
  name: string;
  city: string;
  theme: ThemeType;
};

export interface IWeather {
  temperature: string;
  windspeed: string;
}
