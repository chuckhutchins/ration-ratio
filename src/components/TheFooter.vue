<template>
  <footer class="footer">
    <p>
      <TheButton @click="handleOpenInfoDialog">info</TheButton>
    </p>
    <p>
      made with 🍕 <span class="sr-only">pizza</span> in ✋ <span class="sr-only">michigan</span>
    </p>
  </footer>
  <InfoDialog ref="infoDialog" />
</template>

<script setup>
import { useTemplateRef } from 'vue';
import InfoDialog from '@/components/InfoDialog.vue';
import TheButton from '@/components/TheButton.vue';

const infoDialogRef = useTemplateRef('infoDialog');

const handleOpenInfoDialog = () => {
  infoDialogRef.value.openDialog();
}
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-block-start: 1rem;
  border-block-start: 2px solid;

  p {
    line-height: 1rem;
  }
}
</style>
