<template>
  <a href="javascript:void(0)">{{navTitle}}</a>
</template>
<script lang="ts" setup>
let props = defineProps<{
  navTitle: string
}>()
</script>
<style lang="less" scoped>
@nav-height: 64px;
@main-color: #2286F7;
a{
  position: relative;
  text-decoration: none;
  color: #000;
  margin: 0 10px;
  display: block;
  height: 100%;
  line-height: @nav-height;
  transition: 0.3s ease-in-out;
  &:hover {
    color: @main-color;
  }
  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    width: 100%;
    background-color: #fff;
    transition: all 0.3s;
  }
  &:hover::before {
    background-color: @main-color;

  }
}
</style>