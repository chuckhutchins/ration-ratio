<template>
  <dialog
    class="dialog-wrapper"
    :inert="!isOpen"
    ref="dialog"
    :aria-labelledby="headerId"
    :aria-describedby="contentId"
    @close="handleCloseDialog"
    @cancel="handleCloseDialog"
  >
    <div class="dialog">
      <header class="header" :id="headerId">
        <slot name="header" />
      </header>
      <button
        class="btn-close"
        type="button"
        @click="closeDialog"
      >
        <IconClose />
        <span class="sr-only">Close dialog</span>
      </button>
      <div class="content" :id="contentId">
        <slot />
      </div>
    </div>
  </dialog>
</template>

<script setup>
import { nextTick, ref, useTemplateRef } from 'vue';
import IconClose from '@/components/IconClose.vue';
import { v4 as uuidv4 } from 'uuid';

const dialogRef = useTemplateRef('dialog');
const isOpen = ref(false);

const uniqueId = `dialog-${uuidv4()}`;
const headerId = `${uniqueId}-header`;
const contentId = `${uniqueId}-content`;

const openDialog = () => {
  if (!dialogRef.value) {
    return;
  }
  
  dialogRef.value.showModal();
  isOpen.value = true;
  
  nextTick(() => {
    const firstFocusable = dialogRef.value.querySelector(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (firstFocusable) {
      firstFocusable.focus();
    } else {
      dialogRef.value.focus();
    }
  });
};

const closeDialog = () => {
  if (!dialogRef.value) {
    return;
  }
  
  dialogRef.value.close();
  isOpen.value = false;
};

const handleCloseDialog = () => {
  closeDialog();
};


defineExpose({ openDialog, closeDialog });
</script>

<style scoped lang="scss">
.dialog-wrapper {
  position: fixed;
  inset: 0;
  margin: auto;
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

  &:not([open]) {
    pointer-events: none;
    opacity: 0;
  }

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(0.5rem);
  }
}

.dialog {
  display: grid;
  grid-template-rows: minmax(1.5rem, 1fr);
  grid-template-columns: 1fr 1rem;
  gap: 1rem 0.5rem;

  @media (min-width: 48rem) {
    padding: 1.5rem;
    gap: 1.5rem 0.5rem;
  }

  > * {
    min-inline-size: 0;
  }
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
</style>