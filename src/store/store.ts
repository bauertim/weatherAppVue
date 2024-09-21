import { defineStore } from "pinia";
import { onMounted, ref, watch } from "vue";
import {
  fetchDataForecast,
  fetchDataForecastCurrent,
  fetchDataWeather,
  fetchWeatherDataCurrent,
} from "../apiCalls/fetchWeather";
import { getUserLocation } from "../utils/userLocation";

export const useWeatherDataStore = defineStore("weatherData", () => {
  const city = ref<string>("");
  const weatherData = ref<WeatherDataProps>(null);
  const searchList = ref<SearchItem[] | []>([]);

  const forecastData = ref<ForecastItem | null>(null);
  const userLocation = ref<userLocationProps | null>(null);

  const updateWeatherData = (data: WeatherDataProps) => {
    weatherData.value = data;
  };
  const updateSearchList = (data: SearchItem[]) => {
    searchList.value = data;
  };
  const updateCity = (data: string) => {
    city.value = data;
  };
  const updateForecastData = (data: any) => {
    forecastData.value = data;
  };
  const updateUserLocation = (data: userLocationProps) => {
    userLocation.value = data;
  };

  watch(city, (newCity) => {
    if (newCity !== "") {
      fetchDataWeather(
        searchList.value,
        city.value,
        updateWeatherData,
        updateSearchList
      );
      fetchDataForecast(city.value, updateForecastData);
    }
  });

  onMounted(() => {
    getUserLocation(updateUserLocation, userLocation.value);
    const storage = localStorage.getItem("currentLocation");
    if (storage) {
      updateUserLocation(JSON.parse(storage));
    } else {
      updateCity("Ljubljana");
    }
  });

  watch(userLocation, (newUserLocation) => {
    if (newUserLocation) {
      fetchWeatherDataCurrent(
        searchList.value,
        userLocation.value,
        updateWeatherData,
        updateSearchList
      );
      fetchDataForecastCurrent(userLocation.value, updateForecastData);
    }
  });

  return {
    weatherData,
    searchList,
    city,
    forecastData,
    userLocation,
    updateWeatherData,
    updateSearchList,
    updateCity,
    updateForecastData,
    updateUserLocation,
  };
});

export const useFormDataStore = defineStore("formData", () => {
  const inputValue = ref<string>("");
  const updateInputvalue = (data: string) => {
    inputValue.value = data;
  };
  return { inputValue, updateInputvalue };
});
