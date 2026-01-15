<template>
  <main class="ratio-calculator">
    <div class="metadata">
      <h2>metadata</h2>
      <InputText v-model="name" label="name" />
    </div>
    <div class="totals">
      <h2>{{ inputColumnText }}</h2>
      <InputNumber v-model="totalGrams" label="grams" />
      <InputNumber v-model="totalCalories" label="calories" />
      <InputNumber v-model="totalFats" label="fats" />
      <InputNumber v-model="totalCarbs" label="carbs" />
      <InputNumber v-model="totalProteins" label="proteins" />
    </div>
    <div class="calculated">
      <h2>{{ outputColumnText }}</h2>
      <InputNumber v-model="servingGrams" label="grams" />
      <div class="macros">
        <h3>macros</h3>
        <p>calories: <span>{{ servingCalories }}</span></p>
        <p>fats: <span>{{ servingFats }}</span></p>
        <p>carbs: <span>{{ servingCarbs }}</span></p>
        <p>proteins: <span>{{ servingProteins }}</span></p>
      </div>
    </div>
    <div v-if="hasError" class="error-list">
      <ul>
        <li v-for="error in errorList" :key="error">
          {{ error}}
        </li>
      </ul>
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
import InputNumber from '@/components/InputNumber.vue';
import InputText from '@/components/InputText.vue';
import TheButton from '@/components/TheButton.vue';
import { calculateCombination } from '@/composables/useCalculation.js';
import { v4 as uuidv4 } from 'uuid';

const showSampleDataButton = ref(true);
const generateSampleData = () => {
  name.value = 'peanut butter';
  totalGrams.value = 32;
  totalCalories.value = 190;
  totalFats.value = 16;
  totalCarbs.value = 6;
  totalProteins.value = 7;
  servingGrams.value = 70;
}

const store = useStore();
const { isReverse } = storeToRefs(store);

const inputColumnText = computed(() => isReverse.value ? 'totals' : 'per serving');
const outputColumnText = computed(() => isReverse.value ? 'per serving' : 'total');

const name = ref();
const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};
const gramRatio = computed(() => {
  const total = toNumber(totalGrams.value);
  const serving = toNumber(servingGrams.value);
  if (total === null || serving === null || total <= 0) {
    return null;
  }
  return serving / total;
});
const totalGrams = ref();
const totalCalories = ref();
const totalFats = ref();
const totalCarbs = ref();
const totalProteins = ref();
const servingGrams = ref();
const calculateServing = (value) => {
  if (gramRatio.value === null) {
    return calculateCombination(0);
  }
  const number = toNumber(value) ?? 0;
  return calculateCombination(number * gramRatio.value);
};
const servingCalories = computed(() => calculateServing(totalCalories.value));
const servingFats = computed(() => calculateServing(totalFats.value));
const servingCarbs = computed(() => calculateServing(totalCarbs.value));
const servingProteins = computed(() => calculateServing(totalProteins.value));

const handleReset = () => {
  name.value = undefined;
  totalGrams.value = undefined;
  totalCalories.value = undefined;
  totalFats.value = undefined;
  totalCarbs.value = undefined;
  totalProteins.value = undefined;
  servingGrams.value = undefined;
  errorList.value = [];
};

const hasError = computed(() => errorList.value.length > 0);
const errorList = ref([]);
const validate = () => {
  const isInvalid = (val) => {
    const num = Number(val);
    return isNaN(num) || val === undefined || val === null || val === '';
  };

  // TODO: clean up how validation works

  if (isInvalid(totalGrams.value) || isInvalid(servingGrams.value)) {
    errorList.value.push('grams cannot be empty.');
  }

  const primaryGrams = Number(totalGrams.value);
  const secondaryGrams = Number(servingGrams.value);
  const calories = Number(totalCalories.value || 0);
  const fats = Number(totalFats.value || 0);
  const carbs = Number(totalCarbs.value || 0);
  const proteins = Number(totalProteins.value || 0);

  if (primaryGrams <= 0 || secondaryGrams <= 0) {
    errorList.value.push('grams must be greater than 0.');
  }
  if (primaryGrams > 10000) {
    errorList.value.push('grams must be less than or equal to 10,000.');
  }
  if (calories > 10000) {
    errorList.value.push('calories must be less than or equal to 10,000.');
  }
  if (calories < 0) {
    errorList.value.push('calories must be 0 or greater.');
  }
  if (fats > 10000) {
    errorList.value.push('fats must be less than or equal to 10,000.');
  }
  if (fats < 0) {
    errorList.value.push('fats must be 0 or greater.');
  }
  if (carbs > 10000) {
    errorList.value.push('carbs must be less than or equal to 10,000.');
  }
  if (carbs < 0) {
    errorList.value.push('carbs must be 0 or greater.');
  }
  if (proteins > 10000) {
    errorList.value.push('proteins must be less than or equal to 10,000.');
  }
  if (proteins < 0) {
    errorList.value.push('proteins must be 0 or greater.');
  }

  if ((fats + carbs + proteins) > primaryGrams) {
    errorList.value.push('the sum of fats, carbs, and proteins must be less than or equal to grams.');
  }

  console.log(errorList.value);
}

const handleSave = () => {
  errorList.value = [];
  validate();
  if (hasError.value) {
    return;
  }

  const item = {
    id: uuidv4(),
    name: name.value || 'generic food',
    calories: servingCalories.value,
    fats: servingFats.value,
    carbs: servingCarbs.value,
    proteins: servingProteins.value,
  }
  store.addFoodItem(item);
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

.metadata,
.error-list {
  grid-column: span 2;
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

.error-list {
  border: 2px solid var(--color-error);
  padding: 0.875rem 1rem;
  color: var(--color-error);
}

.actions {
  grid-column: span 2;
  display: flex;
  justify-content: end;
  gap: 1rem;
}
</style>
