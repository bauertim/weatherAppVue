<script setup>
import { defineProps } from "vue";
import { useFormDataStore, useWeatherDataStore } from "../store/store";

const props = defineProps({
  search: {
    type: Object,
    required: true,
    // validator: (value) => {
    //   return (
    //     typeof value.name === "string" &&
    //     Array.isArray(value.weather) &&
    //     typeof value.main === "object"
    //   );
    // },
  },
});

const store = useWeatherDataStore();
const storeForm = useFormDataStore();

const handleClick = () => {
  store.updateCity(props.search.name);
  storeForm.updateInputvalue(props.search.name);
};
</script>

<template>
  <li class="text-sm">
    <button
      @click="handleClick"
      class="flex flex-row items-center bg-gradient-to-r from-blue-400 to-blue-500 rounded-sm px-3 border-y-[0.5px] w-full"
    >
      <div class="w-28 flex">{{ props.search.name }}</div>
      <img
        :src="`https://openweathermap.org/img/wn/${props.search.weather[0].icon}.png`"
        alt="weather icon"
        class="w-12 h-12"
      />
      <p>{{ props.search.main.temp.toFixed(1) + "°" }}</p>
    </button>
  </li>
</template>
