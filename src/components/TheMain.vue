<template>
  <main class="main">
    <RatioCalculator />
    <FoodWrapper v-if="hasFoodList" />
  </main>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import FoodWrapper from '@/components/FoodWrapper.vue';
import RatioCalculator from '@/components/RatioCalculator.vue';

const store = useStore();
const { foodList } = storeToRefs(store);
const hasFoodList = computed(() => foodList.value.length > 0);
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