<template>
    <ul class="list">
      <FoodItem
        v-for="item in foodList"
        :foodItem="item"
        :key="item.id"
      />
    </ul>
  <div class="actions">
    <TheButton @click="handleClear">clear</TheButton>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import FoodItem from '@/components/FoodItem.vue';
import TheButton from '@/components/TheButton.vue';

const store = useStore();
const { foodList } = storeToRefs(store);

const handleClear = () => {
  store.resetFoodList();
}
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>