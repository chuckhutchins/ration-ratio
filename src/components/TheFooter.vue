<template>
  <footer class="footer">
    <p>
      <a href="https://github.com/chuckhutchins/ration-ratio" target="_blank">source</a>
    </p>
    <p>
      made with 🍕
    </p>
  </footer>
</template>

<script setup></script>

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
