<template>
  <label class="label" :for="uniqueId">
    {{ label }}
    <input
      class="input"
      :id="uniqueId"
      :value="modelValue ?? ''"
      @input="handleInput"
    >
  </label>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const uniqueId = uuidv4();

const handleInput = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<style scoped lang="scss">
.label {
  display: grid;
  gap: 0.25rem;

  > * {
    min-inline-size: 0;
  }
}

.input {
  font-size: 1rem;
  line-height: 1;
  background-color: var(--color-white);
  padding: 0.25rem 0.375rem;
  border: 2px solid var(--text);
  border-radius: 0;

  &:focus {
    outline: none;
    border-style: dashed;
  }
}
</style>
