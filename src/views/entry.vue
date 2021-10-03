<template>
  <div>
    <v-header></v-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts" setup>
import Cookies from "js-cookie";
import VHeader from "./header.vue"
import {useRoute, useRouter} from "vue-router";
const route = useRoute()
const router = useRouter()
const pId = Cookies.get("parentId")
switch (pId) {
  case "0":
    router.push("/watch")
    break
  case "1":
    router.push("/taskkb")
    break
  case "2":
    router.push("/taskList")
    break
  default:
    router.push("/index")
    break
}
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
