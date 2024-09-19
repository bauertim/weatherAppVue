import { ref, onMounted, watch } from "vue";
import {
  fetchDataForecast,
  fetchDataForecastCurrent,
  fetchDataWeather,
  fetchWeatherDataCurrent,
} from "../apiCalls/fetchWeather";
import { getUserLocation } from "../utils/userLocation";
import { WeatherData } from "../store/store";

export const useLocationStorage = () => {
  const userLocation = ref<{ latitude: number; longitude: number } | null>(
    null
  );

  onMounted(() => {
    const storage = localStorage.getItem("currentLocation");
    getUserLocation((location: { latitude: number; longitude: number }) => {
      userLocation.value = location;
    });
    if (storage) {
      userLocation.value = JSON.parse(storage);
    } else {
      fetchDataWeather(
        WeatherData.setWeatherData,
        WeatherData.setSearchList,
        WeatherData.searchList,
        WeatherData.setErrorFetch,
        WeatherData.errorFetch,
        "Ljubljana"
      );
      fetchDataForecast(WeatherData.setForecastData, "Ljubljana");
    }
  });

  watch(userLocation, (newLocation) => {
    if (newLocation) {
      fetchWeatherDataCurrent(
        WeatherData.setWeatherData,
        WeatherData.setSearchList,
        WeatherData.searchList,
        WeatherData.setErrorFetch,
        WeatherData.errorFetch,
        newLocation
      );
      fetchDataForecastCurrent(WeatherData.setForecastData, newLocation);
    }
  });
};
