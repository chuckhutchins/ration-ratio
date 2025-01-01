<template>
  <li class="item">
    <span>{{ foodItem.calories }}</span>
    <span>{{ foodItem.fats }}</span>
    <span>{{ foodItem.carbs }}</span>
    <span>{{ foodItem.proteins }}</span>
    <button class="button-close" @click="handleRemoveItem">
      <IconClose />
      <span class="sr-only">Remove Item</span>
    </button>
  </li>
</template>

<script setup>
import { useStore } from '@/stores/Store.js';
import IconClose from '@/components/IconClose.vue';

const props = defineProps(['foodItem']);

const handleRemoveItem = () => {
  useStore().removeFoodItem(props.foodItem.id);
}
</script>

<style scoped lang="scss">
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