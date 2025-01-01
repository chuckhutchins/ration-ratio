<template>
  <button class="button" :class="{'is-primary': isPrimary}">
    <slot />
  </button>
</template>

<script setup>
defineProps(['isPrimary']);
</script>

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

  &.is-primary {
    background-color: var(--text);
    color: var(--bg);

    &:hover {
      background-color: var(--color-dark-gray);
    }

    &:focus {
      border-color: var(--bg);
    }
  }
}
</style>
