<template>
    <div class="totals">
      totals
      {{ totals.calories }}
      <span aria-hidden="true">//</span>
      {{ totals.fats }}
      <span aria-hidden="true">//</span>
      {{ totals.carbs }}
      <span aria-hidden="true">//</span>
      {{ totals.proteins }}
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import { calculateCombination } from '@/composables/useCalculation.js';

const store = useStore();
const { foodList } = storeToRefs(store);

const totals = computed(() => {
  const accumulator = {
    calories: 0,
    fats: 0,
    carbs: 0,
    proteins: 0,
  }

  foodList.value.forEach(item => {
    accumulator.calories += Number(item.calories) || 0;
    accumulator.fats += Number(item.fats) || 0;
    accumulator.carbs += Number(item.carbs) || 0;
    accumulator.proteins += Number(item.proteins) || 0;
  });

  return {
    calories: calculateCombination(accumulator.calories),
    fats: calculateCombination(accumulator.fats),
    carbs: calculateCombination(accumulator.carbs),
    proteins: calculateCombination(accumulator.proteins),
  };
});
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