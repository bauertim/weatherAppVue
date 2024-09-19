declare interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

declare interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

declare interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

declare interface Rain {
  "1h": number;
}

declare interface Clouds {
  all: number;
}

declare interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

declare interface SearchItem {
  coord: { lon: number; lat: number };
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

declare type WeatherDataProps = SearchItem | null;

declare interface DataContextType {
  weatherData: WeatherType | null;
  searchList: SearchItem[] | [];
  city: string;
  forecastData: ForecastItem | null;
  errorFetch: boolean;
}

declare interface ForecastItem {
  list: Array<{
    dt_txt: string;
    weather: Array<{ icon: string }>;
    main: { temp: number };
  }>;
}

declare interface userLocationProps {
  latitude: number;
  longitude: number;
}
