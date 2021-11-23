<template>
  <div>
    <div style="font-size: 18px;">
      <MessageOutlined />
      <span id="notice-title">{{ props.title }}</span>
    </div>
    <div style="color: #aaa">{{ props.time }}</div>
    <div style="font-size: 15px;">
      <p>{{ props.content }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { MessageOutlined } from '@ant-design/icons-vue'

const props = defineProps<{
  title: string
  time: string
  content: string
}>()
</script>
<style lang="less" scoped>
#notice-title {
  margin-left: 5px;
}
</style>
