<template>
  <label class="label" :for="uniqueId">
    <input
      :checked="modelValue"
      class="input"
      :id="uniqueId"
      :value="modelValue"
      type="checkbox"
      @input="$emit('update:modelValue', $event.target.checked)"
    >
    {{ label }}
  </label>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

defineProps(['label', 'modelValue']);

const uniqueId = uuidv4();
</script>

<style scoped lang="scss">
.label {
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.input {
  appearance: none;
  font-size: 1rem;
  line-height: 1;
  background-color: var(--color-white);
  margin: 0;
  border: 2px solid var(--text);
  accent-color: var(--text);
  block-size: 1rem;
  inline-size: 1rem;
  display: grid;
  place-content: center;

  &::before {
    content: "";
    width: 0.5555rem;
    height: 0.5555rem;
    transform: scale(0);
    box-shadow: inset 1rem 1rem var(--text);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus {
    outline: none;
    border-style: dashed;
  }
}
</style>
