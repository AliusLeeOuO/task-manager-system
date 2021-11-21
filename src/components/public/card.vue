<template>
  <div id="out">
    <div id="title" v-if="props.title">
      {{props.title}}
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
  const props = defineProps<{
    title?: string
  }>();
</script>
<style lang="less" scoped>
#out {
  padding: 25px;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #E0E0E0;
  transition: 0.3s ease-in-out;
  #title {
    margin-bottom: 15px;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
