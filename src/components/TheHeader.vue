<template>
  <header class="header">
    <h1>
      <span class="ration">ration</span>
      <span class="slashes">//</span>
      <span class="ratio">ratio</span>
    </h1>
    <InputCheckbox v-model="isReverse" label="reverse" />
  </header>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useStore } from '@/stores/Store.js';
import InputCheckbox from '@/components/InputCheckbox.vue';

const store = useStore();
const { isReverse } = storeToRefs(store);
</script>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  border-block-end: 2px solid;
  padding-block-end: 1rem;

  h1 {
    font-size: 1.25rem;
    line-height: 1;

    > span {
      display: inline-block;
      font-weight: 700;
    }
  }

  .ratio {
    transform: scaleX(-1);
  }
}
</style>
