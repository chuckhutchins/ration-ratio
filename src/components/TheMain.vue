<template>
  <main class="main">
    <RatioCalculator />
    <FoodWrapper v-if="hasFoodItems" />
  </main>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import FoodWrapper from '@/components/FoodWrapper.vue';
import RatioCalculator from '@/components/RatioCalculator.vue';

const store = useStore();
const { hasFoodItems } = storeToRefs(store);
</script>

<style scoped lang="scss">
.main {
  display: grid;
  gap: 1rem;

  > * {
    min-inline-size: 0;
  }
}
</style>