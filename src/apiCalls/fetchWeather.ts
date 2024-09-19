import axios from "axios";

export const fetchDataWeather = async (
  searchList: SearchItem[] | [],
  errorFetch: boolean,
  city: string,
  updateWeatherData: Function,
  updateSearchList: Function,
  updateErrorFetch: Function
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }`
    );
    updateWeatherData(response.data);

    let data = [response.data, ...searchList.slice(0, 5)].filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    );
    updateSearchList(data);
    localStorage.setItem("searchHistory", JSON.stringify(data));
    // console.log("response data", response.data);

    // console.log(response.data);
  } catch (error) {
    console.error(error);
    updateErrorFetch(!errorFetch);
  }
};

export const fetchWeatherDataCurrent = async (
  searchList: SearchItem[] | [],
  errorFetch: boolean,
  userLocation: {
    latitude: number;
    longitude: number;
  } | null,
  updateWeatherData: Function,
  updateSearchList: Function,
  updateErrorFetch: Function
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${
        userLocation?.latitude
      }&lon=${userLocation?.longitude}&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }`
    );
    let data = response.data;
    data = {
      ...data,
      main: {
        ...data.main,
        temp: data.main.temp - 274.15,
        feels_like: (data.main.feels_like - 274.15).toFixed(1),
        temp_max: data.main.temp_max - 274.15,
        temp_min: data.main.temp_min - 274.15,
      },
    };
    updateWeatherData(data);
    updateSearchList(
      [data, ...searchList.slice(0, 5)].filter(
        (v, i, a) => a.findIndex((t) => t.name === v.name) === i
      )
    );
    // console.log(response.data);
  } catch (error) {
    // console.error(error);
    updateErrorFetch(!errorFetch);
  }
};

export const fetchDataForecast = async (
  city: string,
  updateForecastData: Function
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }`
    );
    updateForecastData(response.data);
    // console.log("forecast data:", response.data);
  } catch (error) {
    console.error(error);
  }
};

export const fetchDataForecastCurrent = async (
  userLocation: {
    latitude: number;
    longitude: number;
  } | null,
  updateForecastData: Function
) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${
        userLocation?.latitude
      }&lon=${userLocation?.longitude}&appid=${
        import.meta.env.VITE_OPENWEATHER_API_KEY
      }`
    );
    let data = response.data;
    data = {
      ...data,
      list: data.list.map((item: { main: { temp: number } }) => {
        return {
          ...item,
          main: {
            ...item.main,
            temp: item.main.temp - 274.15,
          },
        };
      }),
    };
    updateForecastData(data);
  } catch (error) {
    console.error(error);
  }
};
