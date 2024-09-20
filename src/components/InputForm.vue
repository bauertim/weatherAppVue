<script setup lang="ts">
import { useWeatherDataStore, useFormDataStore } from "../store/store";
import { Search, X } from "lucide-vue-next";

const store = useWeatherDataStore();
const storeForm = useFormDataStore();

const clearInput = () => {
  storeForm.updateInputvalue("");
};

// const onPlaceSelected = (place) => {
//   if (place) {
//     if (place.name) {
//       setCity(place.name.replace(/(\d+,?\s*)+/g, ""));
//     } else if (place.formatted_address) {
//       setCity(place.formatted_address.replace(/(\d+,?\s*)+/g, ""));
//     }
//   }
// };
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, scale: 0 }"
    :enter="{ opacity: 1, scale: 1 }"
    :duration="800"
    :delay="600"
  >
    <div class="flex text-black justify-center flex-row items-center relative">
      <!-- <AnimatePresence initial="false"> -->
      <!-- <motion.div
      animate="{ opacity: [0, 1, 1, 0], scale: [0, 1, 1, 0.1] }"
      transition="{ duration: 4.2, times: [0, 0.1, 0.9, 1] }"
      :key="errorFetch.toString()"
      exit="{ opacity: 0, size: 0 }"
      class="absolute -bottom-8 z-10 bg-red-500 px-4 py-3 rounded-lg text-lg text-white"
    >
      Can't find the city :/
    </motion.div> -->
      <!-- </AnimatePresence> -->
      <div class="flex w-72 relative">
        <!-- <ReactGoogleAutocomplete
          :apiKey="import.meta.env.VITE_GOOGLE_API_KEY"
          @place-selected="onPlaceSelected"
          :value="inputValue"
          @change="handleInputChange"
          class="bg-white shadow-md shadow-neutral-300 rounded-full p-2 pl-4 flex w-full mt-6 mb-4"
        /> -->
        <form
          @submit.prevent="store.updateCity(storeForm.inputValue)"
          class="flex text-black justify-center flex-row items-center"
        >
          <input
            type="text"
            placeholder="Enter city name"
            v-model="storeForm.inputValue"
            class="bg-white shadow-md shadow-neutral-300 rounded-full p-2 pl-4 flex w-72 mt-6 mb-4"
          />
          <!-- <button
          class="ml-3 mt-1"
          @click="store.updateCity(storeForm.inputValue)"
        >
          Search
        </button> -->
        </form>

        <button
          v-if="storeForm.inputValue !== ''"
          class="absolute right-3 top-[35px]"
          @click="clearInput"
        >
          <X color="lightgray" :size="20" />
        </button>
      </div>
      <button class="ml-3 mt-1" @click="store.updateCity(storeForm.inputValue)">
        <Search :size="24" />
      </button>
    </div>
  </div>
</template>
