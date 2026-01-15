<template>
    <div class="totals">
      totals
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

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

const totals = computed(() => foodList.value.reduce((accumulator, item) => ({
  calories: accumulator.calories + toNumber(item.calories),
  fats: accumulator.fats + toNumber(item.fats),
  carbs: accumulator.carbs + toNumber(item.carbs),
  proteins: accumulator.proteins + toNumber(item.proteins),
}), {
  calories: 0,
  fats: 0,
  carbs: 0,
  proteins: 0,
}));

const totalCalories = computed(() => calculateCombination(totals.value.calories));
const totalFats = computed(() => calculateCombination(totals.value.fats));
const totalCarbs = computed(() => calculateCombination(totals.value.carbs));
const totalProteins = computed(() => calculateCombination(totals.value.proteins));
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