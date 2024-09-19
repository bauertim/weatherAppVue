<script setup lang="ts">
import { useWeatherDataStore } from "../store/store";

const store = useWeatherDataStore();
</script>

<template>
  <!-- <motion.div
    :initial="{ opacity: 0, x: 100 }"
    :animate="{ opacity: 1, x: 0 }"
    :transition="{ duration: 0.5, delay: 0.2 }"
  > -->
  <div>
    <div
      v-if="store.forecastData"
      class="my-4 flex flex-row overflow-x-auto bg-blue-900 rounded-lg p-2 sm:w-[600px] mx-auto"
    >
      <div
        v-for="(hours, index) in store.forecastData.list"
        :key="index"
        class="mr-4 min-h-20 min-w-9 flex flex-col items-center justify-between"
      >
        <p class="text-center text-sm">
          {{ hours.dt_txt.split(" ")[1].split(":")[0] }}
        </p>
        <img
          :src="`https://openweathermap.org/img/wn/${hours.weather[0].icon}.png`"
          alt="weather icon"
          class="w-9 h-9"
        />
        <p>{{ hours.main.temp.toFixed(1) + "°" }}</p>
      </div>
    </div>
  </div>
  <!-- </motion.div> -->
</template>
