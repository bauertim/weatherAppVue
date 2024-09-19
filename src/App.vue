<script setup lang="ts">
import CityWeather from "./components/CityWeather.vue";
import InputForm from "./components/InputForm.vue";
import PreviousSearch from "./components/PreviousSearch.vue";
import CityForecast from "./components/CityForecast.vue";
</script>

<template>
  <main className="flex flex-col bg-slate-200 text-white px-6 min-h-svh">
    <InputForm />
    <CityWeather />
    <CityForecast />
    <PreviousSearch />
  </main>
</template>
