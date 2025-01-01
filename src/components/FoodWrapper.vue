<template>
  <div class="food-wrapper">
    <FoodTotal />
    <FoodList />
  </div>
</template>

<script setup>
import FoodList from '@/components/FoodList.vue';
import FoodTotal from '@/components/FoodTotal.vue';
</script>

<style scoped lang="scss">
.food-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-block-start: 2px solid var(--text);
  padding-block-start: 1rem;
}
</style>