import { watch } from "vue";
import { useDataContext } from "../context/DataContext";
import { fetchDataForecast, fetchDataWeather } from "../apiCalls/fetchWeather";

export const useCityFetch = () => {
  const {
    setWeatherData,
    searchList,
    setSearchList,
    errorFetch,
    setErrorFetch,
    setForecastData,
    city,
  } = useDataContext();

  watch(city, (newCity) => {
    if (newCity !== "") {
      fetchDataWeather(
        setWeatherData,
        setSearchList,
        searchList,
        setErrorFetch,
        errorFetch,
        newCity
      );
      fetchDataForecast(setForecastData, newCity);
    }
  });
};
