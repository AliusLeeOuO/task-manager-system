<template>
  <div>
    <a href="javascript:void(0);">{{ fileTitle }}</a>
    <a href="javascript:void(0);">删除文件</a>
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
    display: flex;
    justify-content: space-between;
  }
</style>
