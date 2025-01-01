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
      <TheButton @click="generateSampleData">sample</TheButton>
      <TheButton @click="handleReset">reset</TheButton>
      <TheButton :isPrimary="true" @click="handleSave">save</TheButton>
    </div>
    <FoodList
      v-if="hasFoodList"
      :foodList="foodList"
      @removeItem="handleRemoveItem"
    />
  </main>
</template>

<script setup>
import { computed, ref } from 'vue';
import FoodList from '@/components/FoodList.vue';
import NumberInput from '@/components/NumberInput.vue';
import TheButton from '@/components/TheButton.vue';
import { calculateCombination } from '@/composables/useCalculation.js';
import { v4 as uuidv4 } from 'uuid';

const generateSampleData = () => {
  totalGrams.value = 1672;
  totalCalories.value = 1050;
  totalFats.value = 53;
  totalCarbs.value = 135;
  totalProteins.value = 15;
  servingGrams.value = 100;
}

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

const foodList = ref([]);
const hasFoodList = computed(() => foodList.value.length > 0);
const handleSave = () => {
  // TODO: save out current item in list
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

const handleRemoveItem = (foodItem) => {
  const foundIndex = foodList.value.findIndex((item) => item.id === foodItem.id);
  if (foundIndex === -1) {
    return;
  }
  foodList.value.splice(foundIndex, 1);
};

// TODO: add ability to remove an item from foodList
// TODO: add button to add all macros in foodList
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

.food-list {
  grid-column: span 2;
}
</style>
