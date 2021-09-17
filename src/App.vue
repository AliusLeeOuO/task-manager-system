<template>
  <Top></Top>
  <main>
    <Main-block></Main-block>
  </main>
</template>
<script lang="ts" setup>
  import Top from "./views/header.vue"
  import MainBlock from "./views/main.vue"
</script>
<style lang="less" scoped>
main {
  max-width: 1400px;
  margin: 0 auto;
}
</style>