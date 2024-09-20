<script setup lang="ts">
import { onMounted } from "vue";
import { useWeatherDataStore } from "../store/store";
import SmallCityBox from "./SmallCityBox.vue";
import MotionWrapper from "./MotionWrapper.vue";

const store = useWeatherDataStore();

onMounted(() => {
  const searchHistory = localStorage.getItem("searchHistory");
  if (searchHistory) {
    const parsedSearchList = JSON.parse(searchHistory);
    store.updateSearchList(parsedSearchList);
  }
});
</script>

<template>
  <MotionWrapper>
    <div class="bg-blue-500 sm:w-[600px] mx-auto flex flex-col py-3 rounded-lg">
      <h2 class="text-sm text-gray-200 text-light px-3 mb-1">
        Recently viewed cities
      </h2>
      <ul>
        <SmallCityBox
          v-for="(search, index) in store.searchList.slice(0, 5)"
          :key="index + search.name"
          :search="search"
        />
      </ul>
    </div>
  </MotionWrapper>
</template>

<style scoped>
/* Add any scoped styles here */
</style>
