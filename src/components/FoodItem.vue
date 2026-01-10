<template>
  <li class="item">
    <span class="name">{{ foodItem.name }}</span>
    <span>
      {{ foodItem.calories }}/{{ foodItem.fats }}/{{ foodItem.carbs }}/{{ foodItem.proteins }}
    </span>
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

const store = useStore();

const handleRemoveItem = () => {
  store.removeFoodItem(props.foodItem.id);
}
</script>

<style scoped lang="scss">
.item {
  display: grid;
  grid-template-columns: 1fr repeat(2, max-content);
  align-items: center;
  gap: 1rem;

  > * {
    min-inline-size: 0;
  }

  span:not(.name) {
    text-align: end;
  }
}

.name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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