<template>
  <Top></Top>
  <main>
    <router-view></router-view>
  </main>
</template>
<script lang="ts" setup>
  import Top from "./views/header.vue"
</script>
<style lang="less" scoped>
@max-width: 1400px;
@gutter: 30px;
main {
  max-width: @max-width;
  margin: 0 auto;
}
@media only screen and (max-width: (@max-width+(-@gutter))) {
  main {
    padding-left: @gutter*.5;
    padding-right: @gutter*.5;
  }
}
</style>
