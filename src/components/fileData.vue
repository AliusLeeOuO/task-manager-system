<template>
  <div>
    <a :href="href">{{ fileTitle }}</a>
  </div>
</template>
<script lang="ts" setup>
let props = defineProps<{
  href: string,
  fileTitle: string
}>()
</script>
<style lang="less" scoped>
  div {
    width: 100%;
    padding: 8px;
    border-bottom: 1px solid #D9D9D9;
    margin-bottom: 5px;
  }
</style>
