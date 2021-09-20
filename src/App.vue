<template>
  <div v-if="!layout.state.isLogin">
    <Top></Top>
    <main>
      <router-view></router-view>
    </main>
  </div>
  <div v-if="layout.state.isLogin">
    <router-view></router-view>
  </div>
</template>
<script lang="ts" setup>
  import Top from "./views/header.vue"

  import layout from "./store/layout";

</script>
<style lang="less" scoped>
@max-width: 1400px;
@gutter: 30px;
main {
  max-width: @max-width;
  margin: 80px auto 0;
}
@media only screen and (max-width: (@max-width+(-@gutter))) {
  main {
    padding-left: @gutter*.5;
    padding-right: @gutter*.5;
  }
}
</style>
