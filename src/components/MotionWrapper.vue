<script setup lang="ts">
const props = defineProps({
  position: {
    type: Number,
    default: -100,
  },
});
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, x: props.position }"
    :enter="{ opacity: 1, x: 0 }"
    :duration="500"
    :delay="200"
  >
    <slot></slot>
  </div>
</template>
