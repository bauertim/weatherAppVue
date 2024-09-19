<script setup lang="ts">
import { ref } from "vue";
import { useWeatherDataStore } from "../store/store";

const store = useWeatherDataStore();

const hideDiv = ref(true);

const toggleHideDiv = () => {
  hideDiv.value = !hideDiv.value;
};
</script>

<template>
  <!-- <motion.div
    :initial="{ opacity: 0, x: -100 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.5, delay: 0.2 }"
  > -->
  <button
    @click="toggleHideDiv"
    class="flex flex-col bg-blue-500 text-white rounded-xl p-4 font-light sm:w-[600px] mx-auto bg-gradient-to-r from-blue-400 to-blue-500 sm:cursor-default w-full sm:justify-between items-center sm:items-stretch"
  >
    <div
      v-if="store.weatherData"
      class="flex flex-row weitems-center justify-center sm:justify-between sm:ml-8"
    >
      <div class="flex flex-col items-center">
        <h2 class="text-2xl mt-1">{{ store.weatherData.name }}</h2>
        <p class="text-5xl">{{ store.weatherData.main.temp.toFixed(1) }}°</p>
        <p class="mt-1">{{ store.weatherData.weather[0].description }}</p>
        <div class="flex flex-row gap-5 text-sm">
          <p>H : {{ store.weatherData.main.temp_max.toFixed(0) }}°C</p>
          <p>L : {{ store.weatherData.main.temp_min.toFixed(0) }}°C</p>
        </div>
        <img
          :src="`https://openweathermap.org/img/wn/${store.weatherData.weather[0].icon}.png`"
          alt="weather icon"
          class="w-[50px] h-[50px]"
        />
        <div
          :class="{ hidden: hideDiv, 'sm:hidden flex flex-col': !hideDiv }"
          class="text-sm sm:mr-4 sm:mt-4"
        >
          <p>Feels like : {{ store.weatherData.main.feels_like }}°C</p>
          <p>Humidity : {{ store.weatherData.main.humidity }}%</p>
          <p>Pressure : {{ store.weatherData.main.pressure }}</p>
          <p>Wind Speed : {{ store.weatherData.wind.speed }}m/s</p>
        </div>
      </div>
      <div class="hidden sm:flex"></div>
      <div class="text-sm hidden sm:flex sm:flex-col sm:mr-4 sm:mt-4">
        <p>Feels like : {{ store.weatherData.main.feels_like }}°C</p>
        <p>Humidity : {{ store.weatherData.main.humidity }}%</p>
        <p>Pressure : {{ store.weatherData.main.pressure }}</p>
        <p>Wind Speed : {{ store.weatherData.wind.speed }}m/s</p>
      </div>
    </div>
    <p v-else>Search for weather</p>
  </button>
  <!-- <button @click="changeCity" class="bg-red-500">change city</button> -->
  <!-- </motion.div> -->
</template>
