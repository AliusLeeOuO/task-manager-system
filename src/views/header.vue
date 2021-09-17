<template>
  <header>
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block nav-title="首页"></nav-block>
        <nav-block nav-title="我是导航2"></nav-block>
        <nav-block nav-title="我是导航3"></nav-block>
        <nav-block nav-title="我是导航4"></nav-block>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import NavBlock from "../components/header/nav-block.vue"
</script>
<style lang="less" scoped>
  @nav-height: 64px;
  @main-color: #2286F7;
  header {
    background-color: #fff;
    height: @nav-height;
    box-shadow: rgb(240, 241, 242) 0 2px 8px 0;
    padding: 0 15px;
    display: flex;
    margin-bottom: 20px;
    &> * {
      height: 100%;
    }
    #header-left {
      display: flex;
      justify-content: center;
      align-items: center;
      #header-logo {
        margin-right: 20px;
      }
      nav {
        height: 100%;
        display: flex;
      }
    }
  }
</style>