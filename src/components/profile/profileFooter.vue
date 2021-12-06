<template>
  <div>
    <a href="javascript:void(0);" @click="openSourceLicense">开源软件使用许可</a>
  </div>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
const router = useRouter()
const openSourceLicense = () => {
  router.push("/openSourceLicense")
}
</script>
<style lang="less" scoped>
div {
  text-align: center;
  a {
    color: #aaa;
  }
}
</style>
