<script setup lang="ts">
import { useWeatherDataStore, useFormDataStore } from "../store/store";
import { Search, X } from "lucide-vue-next";
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted } from "vue";

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

onMounted(async () => {
  const loader = new Loader({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    version: "weekly",
  });
  const Places = await loader.importLibrary("places");
  const input = document.getElementById("place");
  const autocomplete = new Places.Autocomplete(input);

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place.address_components) {
      store.updateCity(place?.address_components[0].long_name);
      // console.log(place?.address_components[0].long_name);
      // console.log("place", place?.address_components);
      // console.log(place);
    }
  });
});
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
      <div class="flex w-72 relative">
        <form
          @submit.prevent="store.updateCity(storeForm.inputValue)"
          class="flex text-black justify-center flex-row items-center"
        >
          <input
            type="text"
            placeholder="Enter city name"
            v-model="storeForm.inputValue"
            class="bg-white shadow-md shadow-neutral-300 rounded-full p-2 pl-4 flex w-72 mt-6 mb-4"
            id="place"
          />
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
