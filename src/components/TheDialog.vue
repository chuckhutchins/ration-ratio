<template>
  <dialog
    ref="dialog"
    class="dialog"
    inert
  >
    <div class="header">
      <slot name="header" />
    </div>
    <button
      class="btn-close"
      type="button"
      @click="closeDialog"
    >
      <IconClose />
      <span class="sr-only">Close dialog</span>
    </button>
    <div class="content">
      <slot />
    </div>
  </dialog>
</template>

<script setup>
import { useTemplateRef } from 'vue';
import IconClose from '@/components/IconClose.vue';

const dialogRef = useTemplateRef('dialog');

const openDialog = () => {
  dialogRef.value.removeAttribute('inert');
  dialogRef.value.showModal();
}

const closeDialog = () => {
  dialogRef.value.close();
  dialogRef.value.setAttribute('inert', '');
}

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
.dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  display: grid;
  grid-template-rows: minmax(1.5rem, 1fr);
  grid-template-columns: 1fr 1rem;
  gap: 1rem 0.5rem;
  padding: 1rem;
  background-color: var(--color-white);
  border: none;
  box-shadow: var(--card-box-shadow);
  border-radius: 0.5rem;
  inline-size: 30rem;
  max-inline-size: min(90vw, 30rem);
  max-block-size: min(80vh, 100%);
  max-block-size: min(80dvb, 100%);
  overflow: hidden;
  transition: opacity .2s ease;

  @media (min-width: 48rem) {
    padding: 1.5rem;
    gap: 1.5rem 0.5rem;
  }

  > * {
    min-inline-size: 0;
  }

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.5rem);
  }

  .btn-close {
    position: absolute;
    inset-block-start: 0.5rem;
    inset-inline-end: 0.5rem;
    background-color: transparent;
    border-radius: 0;
    border: 2px solid var(--text);
    padding: 0.25rem;
    transition: 0.2s;
    aspect-ratio: 1;
    cursor: pointer;
    line-height: 0;

    &:hover,
    &:focus {
      svg {
        transform: rotate(90deg);
      }
    }

    &:hover {
      background-color: var(--color-light-gray);
    }

    &:focus {
      outline: none;
      border-style: dashed;
    }

    svg {
      aspect-ratio: 1;
      inline-size: 2rem;
      transition: .2s;
    }
  }

  .content {
    grid-column: span 2;
    overflow-y: auto;

    :slotted(h3) {
      margin-bottom: 0.25rem;
    }

    :slotted(p) {
      margin-bottom: 0.5rem;
    }

    :slotted(ul) {
      margin-bottom: 0.5rem;
      padding-left: 1.5rem;
    }
  }
}
</style>