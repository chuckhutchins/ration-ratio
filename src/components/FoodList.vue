<template>
  <div class="food-list">
    <div class="totals">
      {{ totalCalories }}
      <span>//</span>
      {{ totalFats }}
      <span>//</span>
      {{ totalCarbs }}
      <span>//</span>
      {{ totalProteins }}
    </div>
    <ul class="list">
      <li v-for="item in foodList" class="item" :key="item.id">
        <span>{{ item.calories }}</span>
        <span>{{ item.fats }}</span>
        <span>{{ item.carbs }}</span>
        <span>{{ item.proteins }}</span>
        <button class="button-close" @click="handleRemoveItem(item)">
          <IconClose />
          <span class="sr-only">Remove Item</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import IconClose from '@/components/IconClose.vue';
import { calculateCombination } from '@/composables/useCalculation.js';

const emit = defineEmits(['removeItem']);
const props = defineProps(['foodList']);

const sumValues = (type) => {
  let total = 0;
  props.foodList.forEach(item => {
    total += Number(item[type]);
  });
  return calculateCombination(total);
}

const totalCalories = computed(() => sumValues('calories'));
const totalFats = computed(() => sumValues('fats'));
const totalCarbs = computed(() => sumValues('carbs'));
const totalProteins = computed(() => sumValues('proteins'));

const handleRemoveItem = (item) => {
  emit('removeItem', item);
}
</script>

<style scoped lang="scss">
.food-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-block-start: 2px solid var(--text);
  padding-block-start: 1rem;
}

.totals {
  border: 2px solid var(--text);
  padding: 1rem;
  text-align: center;
  font-weight: 700;

  span {
    display: inline-block;
  }
}

.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.item {
  display: grid;
  grid-template-columns: repeat(4, 1fr) max-content;
  align-items: center;
  gap: 1rem;

  > * {
    min-inline-size: 0;
  }

  span {
    text-align: end;
  }
}

.button-close {
  background-color: var(--text);
  border: 2px solid var(--text);
  border-radius: 0;
  color: var(--bg);
  cursor: pointer;
  line-height: 0;
  padding: 0;

  &:hover {
    background-color: var(--color-dark-gray);
  }

  &:focus {
    outline: none;
    border-style: dashed;
    border-color: var(--bg);
  }

  svg {
    aspect-ratio: 1;
    inline-size: 1.5rem;
  }
}
</style>