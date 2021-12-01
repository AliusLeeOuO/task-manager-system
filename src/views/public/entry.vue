<template>
  <div id="global">
    <v-header></v-header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>
<script lang="ts" setup>

import Cookies from "js-cookie";
import VHeader from "./header.vue"
import { useRoute, useRouter } from "vue-router";
import { onUpdated } from "vue";

const route = useRoute()
const router = useRouter()
const pId = Cookies.get("parentId")

onUpdated(function () {
  redirect()
})

function redirect() {
  if (route.fullPath === "/index") {
    switch (pId) {
      case "0":
        router.push("/dean")
        break
      case "1":
        router.push("/major")
        break
      case "2":
        router.push("/teacher")
        break
      default:
        router.push("/")
        break
    }
  }
}

redirect()
</script>
<style lang="less" scoped>
@max-width: 1400px;
@gutter: 30px;
#global {
  background-color: #e6ecf0;
}
main {
  max-width: @max-width;
  margin: 80px auto 0;
  overflow: hidden;
}

@media only screen and (max-width: (@max-width+(-@gutter))) {
  main {
    padding-left: @gutter*.5;
    padding-right: @gutter*.5;
  }
}
</style>
