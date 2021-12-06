<template>
  <div class="header">
    <span>{{title}}</span>
    <a :href="link" target="_blank">{{link}}</a>
  </div>
  <div class="content">
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  title: string
  link: string
}>()
</script>
<style lang="less" scoped>
.header {
  padding: 5px 10px;
  background-color: #eee;
  height: 40px;
  line-height: 30px;
  border-radius: 5px;
  overflow: hidden;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}
.content {
  & > div {
    border-radius: 5px;
    padding: 10px;
    background-color: #fff;
    margin: 10px 0;
  }
}
</style>
