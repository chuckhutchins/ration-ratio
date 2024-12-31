<template>
  <div class="container">
    <TheHeader />
    <RatioCalculator />
    <TheFooter />
  </div>
</template>

<script setup>
import RatioCalculator from '@/components/RatioCalculator.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheHeader from '@/components/TheHeader.vue';
</script>

<style scoped lang="scss">
.container {
  width: calc(100% - 2rem);
  max-width: 480px;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 1rem 0;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: start;
  grid-gap: 1rem;
  min-height: 100dvh;

  > * {
    min-inline-size: 0;
  }
}
</style>
