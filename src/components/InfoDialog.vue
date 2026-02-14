<template>
  <TheDialog ref="dialog">
    <template v-slot:header>
      <h2>information</h2>
    </template>
    <p>welcome to ration//ratio. this is a utility application to quickly generate some basic macros (calories/fats/carbs/proteins) for the food you consume.</p>
    <h3>suggestions or issues</h3>
    <p>need something? something amiss? please create an issue in the <a href="https://github.com/chuckhutchins/ration-ratio/issues" rel="noopener noreferrer" target="_blank">issues tab</a>.</p>
    <h3>support</h3>
    <p>this is totally not necessary, but if you'd like to, i have a <a href="https://ko-fi.com/brokendivsociety" rel="noopener noreferrer" target="_blank">ko-fi</a> you can toss a dollar or two at if you like the application.</p>
  </TheDialog>
</template>

<script setup>
import { useTemplateRef } from 'vue';
import TheDialog from '@/components/TheDialog.vue';

const dialogRef = useTemplateRef('dialog');

const openDialog = () => {
  dialogRef.value.openDialog();
};

defineExpose({ openDialog });
</script>

<style scoped lang="scss">
h3 {
  margin-block-end: 0.25rem;
}

p:not(:last-child) {
  margin-block-end: 0.5rem;
}
</style>
