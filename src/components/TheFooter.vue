<template>
  <footer class="footer">
    <p class="copyright">
      made with 🍕
    </p>
  </footer>
</template>

<script setup>
</script>

<style scoped lang="scss">
.footer {
  display: grid;
  gap: 1rem;
  padding-block-start: 1rem;
  border-block-start: 2px solid;

  > * {
    min-inline-size: 0;
  }

  .copyright {
    line-height: 1;
    text-align: end;
  }
}
</style>
