<template>
  <a-card title="提交任务">
    <a-result
      status="success"
      title="tit1232132131le"
      sub-title="提交时间：2021年11月11日 11:11 进度：45%"
    >
      <template #extra>
        <a-button key="console" type="primary">返回首页</a-button>
      </template>
    </a-result>
  </a-card>
</template>
<script lang="ts" setup>
const props = defineProps<{
  // title: string,
  // sub
}>()
</script>
<style lang="less" scoped>

</style>
