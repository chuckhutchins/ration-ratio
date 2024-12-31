<template>
  <button class="button">
    <slot />
  </button>
</template>

<script setup></script>

<style scoped lang="scss">
.button {
  font-size: 1rem;
  line-height: 1;
  color: var(--text);
  border-radius: 0;
  border: 2px solid var(--text);
  background-color: transparent;
  padding: 0.375rem 0.625rem;
  min-inline-size: 5rem;
  cursor: pointer;

  &:hover {
    background-color: var(--color-light-gray);
  }

  &:focus {
    outline: none;
    border-style: dashed;
  }
}
</style>
