<template>
  <header class="header">
    <h1>
      <span class="ration">ration</span>
      <span class="slashes">//</span>
      <span class="ratio">ratio</span>
    </h1>
    <div class="actions">

      <TheButton @click="handleOpenInstructionsDialog">
        instructions
      </TheButton>
    </div>
  </header>
  <InstructionsDialog ref="instructionsDialog" />
</template>

<script setup>
import { useTemplateRef } from 'vue';
import InstructionsDialog from '@/components/InstructionsDialog.vue';
import TheButton from '@/components/TheButton.vue';

const instructionsDialogRef = useTemplateRef('instructionsDialog');

const handleOpenInstructionsDialog = () => {
  instructionsDialogRef.value.openDialog();
}
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

.actions {
  display: flex;
  gap: 1rem;
}
</style>
