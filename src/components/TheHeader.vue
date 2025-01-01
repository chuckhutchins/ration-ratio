<template>
  <header class="header">
    <h1>
      <span class="ration">ration</span>
      <span class="slashes">//</span>
      <span class="ratio">ratio</span>
    </h1>
  </header>
</template>

<script setup>
</script>

<style scoped lang="scss">
.header {
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
