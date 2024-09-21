import axios, { AxiosError } from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const fetchDataWeather = async (
  searchList: SearchItem[] | [],
  city: string,
  updateWeatherData: Function,
  updateSearchList: Function
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
  } catch (error: AxiosError | any) {
    if (error.response.status === 404) {
      toast.error("City not found");
    } else if (error.response.status === 401) {
      toast.error("API key invalid");
    } else if (error.response.status === 429) {
      toast.error("API key limit reached");
    } else if (error.response.status === 500) {
      toast.error("Server error");
    } else if (error.response.status === 503) {
      toast.error("Service unavailable");
    } else if (error.response.status === 504) {
      toast.error("Gateway timeout");
    } else if (error.response.status === 400) {
      toast.error("Bad request");
    } else if (error.response.status === 403) {
      toast.error("Forbidden");
    } else if (error.response.status === 405) {
      toast.error("Method not allowed");
    } else if (error.response.status === 408) {
      toast.error("Request timeout");
    } else {
      toast.error("City not found");
    }
    console.error(error);
  }
};

export const fetchWeatherDataCurrent = async (
  searchList: SearchItem[] | [],
  userLocation: {
    latitude: number;
    longitude: number;
  } | null,
  updateWeatherData: Function,
  updateSearchList: Function
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
  } catch (error: AxiosError | any) {
    if (error.response.status === 404) {
      toast.error("City not found");
    } else if (error.response.status === 401) {
      toast.error("API key invalid");
    } else if (error.response.status === 429) {
      toast.error("API key limit reached");
    } else if (error.response.status === 500) {
      toast.error("Server error");
    } else if (error.response.status === 503) {
      toast.error("Service unavailable");
    } else if (error.response.status === 504) {
      toast.error("Gateway timeout");
    } else if (error.response.status === 400) {
      toast.error("Bad request");
    } else if (error.response.status === 403) {
      toast.error("Forbidden");
    } else if (error.response.status === 405) {
      toast.error("Method not allowed");
    } else if (error.response.status === 408) {
      toast.error("Request timeout");
    } else {
      toast.error("City not found");
    }
    // console.error(error);
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
