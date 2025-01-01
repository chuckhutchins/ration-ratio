<template>
    <div class="totals">
      {{ totalCalories }}
      <span>//</span>
      {{ totalFats }}
      <span>//</span>
      {{ totalCarbs }}
      <span>//</span>
      {{ totalProteins }}
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs} from 'pinia';
import { useStore } from '@/stores/Store.js';
import { calculateCombination } from '@/composables/useCalculation.js';

const store = useStore();
const { foodList } = storeToRefs(store);

const sumValues = (type) => {
  let total = 0;
  foodList.value.forEach(item => {
    total += Number(item[type]);
  });
  return calculateCombination(total);
}

const totalCalories = computed(() => sumValues('calories'));
const totalFats = computed(() => sumValues('fats'));
const totalCarbs = computed(() => sumValues('carbs'));
const totalProteins = computed(() => sumValues('proteins'));
</script>

<style scoped lang="scss">
.totals {
  border: 2px solid var(--text);
  padding: 1rem;
  text-align: center;
  font-weight: 700;

  span {
    display: inline-block;
  }
}
</style>