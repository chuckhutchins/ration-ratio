<template>
  <main class="main">
    <div class="totals">
      <h2>totals</h2>
      <NumberInput v-model="totalGrams" label="grams" />
      <NumberInput v-model="totalCalories" label="calories" />
      <NumberInput v-model="totalFats" label="fats" />
      <NumberInput v-model="totalCarbs" label="carbs" />
      <NumberInput v-model="totalProteins" label="proteins" />
    </div>
    <div class="calculated">
      <h2>per serving</h2>
      <NumberInput v-model="servingGrams" label="grams" />
      <div class="macros">
        <h3>macros</h3>
        <p>calories: <span>{{ servingCalories }}</span></p>
        <p>fats: <span>{{ servingFats }}</span></p>
        <p>carbs: <span>{{ servingCarbs }}</span></p>
        <p>proteins: <span>{{ servingProteins }}</span></p>
      </div>
    </div>
    <div class="actions">
      <TheButton @click="handleClear">clear</TheButton>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import NumberInput from '@/components/NumberInput.vue';
import TheButton from '@/components/TheButton.vue';
import { format } from '@/composables/useFormat.js';
import { round } from '@/composables/useRound.js';

const gramRatio = computed(() => servingGrams.value / totalGrams.value);
const totalGrams = ref(0);
const totalCalories = ref(0);
const totalFats = ref(0);
const totalCarbs = ref(0);
const totalProteins = ref(0);
const servingGrams = ref(0);
const servingCalories = computed(() => {
  const value = totalCalories.value * gramRatio.value;
  return calculateServing(value);
});
const servingFats = computed(() => {
  const value = totalFats.value * gramRatio.value;
  return calculateServing(value);
});
const servingCarbs = computed(() => {
  const value = totalCarbs.value * gramRatio.value;
  return calculateServing(value);
});
const servingProteins = computed(() => {
  const value = totalProteins.value * gramRatio.value;
  return calculateServing(value);
});

const calculateServing = (value) => {
  if (!value) {
    return format(round(0));
  }
  return format(round(value));
};

const handleClear = () => {
  totalGrams.value = 0;
  totalCalories.value = 0;
  totalFats.value = 0;
  totalCarbs.value = 0;
  totalProteins.value = 0;
  servingGrams.value = 0;
};
</script>

<style scoped lang="scss">
.main {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: max-content 1fr;
  gap: 1rem;

  > * {
    min-inline-size: 0;
  }
}

.totals,
.calculated,
.macros {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.macros {
  margin-block-start: auto;
  border: 2px solid var(--text);
  padding: 1rem;

  > * {
    min-inline-size: 0;
  }

  p {
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }
}

.actions {
  grid-column: span 2;
  display: flex;
  justify-content: end;
  gap: 1rem;
}
</style>
