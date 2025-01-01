<template>
  <main class="ratio-calculator">
    <div class="totals">
      <h2>{{ inputColumnText }}</h2>
      <NumberInput v-model="totalGrams" label="grams" />
      <NumberInput v-model="totalCalories" label="calories" />
      <NumberInput v-model="totalFats" label="fats" />
      <NumberInput v-model="totalCarbs" label="carbs" />
      <NumberInput v-model="totalProteins" label="proteins" />
    </div>
    <div class="calculated">
      <h2>{{ outputColumnText }}</h2>
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
      <TheButton v-if="showSampleDataButton" @click="generateSampleData">
        sample
      </TheButton>
      <TheButton @click="handleReset">
        reset
      </TheButton>
      <TheButton :isPrimary="true" @click="handleSave">
        save
      </TheButton>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import NumberInput from '@/components/NumberInput.vue';
import TheButton from '@/components/TheButton.vue';
import { calculateCombination } from '@/composables/useCalculation.js';
import { v4 as uuidv4 } from 'uuid';

const showSampleDataButton = ref(true);
const generateSampleData = () => {
  totalGrams.value = 1672;
  totalCalories.value = 1050;
  totalFats.value = 53;
  totalCarbs.value = 135;
  totalProteins.value = 15;
  servingGrams.value = 100;
}

const store = useStore();
const { foodList, isReverse } = storeToRefs(store);

const inputColumnText = computed(() => isReverse.value ? 'per serving' : 'totals');
const outputColumnText = computed(() => isReverse.value ? 'totals' : 'per serving');

const gramRatio = computed(() => servingGrams.value / totalGrams.value);
const totalGrams = ref();
const totalCalories = ref();
const totalFats = ref();
const totalCarbs = ref();
const totalProteins = ref();
const servingGrams = ref();
const servingCalories = computed(() => {
  const value = totalCalories.value * gramRatio.value;
  return calculateCombination(value);
});
const servingFats = computed(() => {
  const value = totalFats.value * gramRatio.value;
  return calculateCombination(value);
});
const servingCarbs = computed(() => {
  const value = totalCarbs.value * gramRatio.value;
  return calculateCombination(value);
});
const servingProteins = computed(() => {
  const value = totalProteins.value * gramRatio.value;
  return calculateCombination(value);
});

const handleReset = () => {
  totalGrams.value = undefined;
  totalCalories.value = undefined;
  totalFats.value = undefined;
  totalCarbs.value = undefined;
  totalProteins.value = undefined;
  servingGrams.value = undefined;
};

const handleSave = () => {
  const item = {
    id: uuidv4(),
    calories: servingCalories.value,
    fats: servingFats.value,
    carbs: servingCarbs.value,
    proteins: servingProteins.value,
  }
  foodList.value.push(item);
  handleReset();
}
</script>

<style scoped lang="scss">
.ratio-calculator {
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
