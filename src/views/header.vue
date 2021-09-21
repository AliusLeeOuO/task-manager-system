<template>
  <header :class="{hidden: layout.state.isLogin}">
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block to="/index" nav-title="任务列表"></nav-block>
        <nav-block to="/submit" nav-title="提交任务"></nav-block>
        <nav-block to="/taskkb" nav-title="任务列表2"></nav-block>
        <nav-block to="/newTask" nav-title="新建任务"></nav-block>
        <nav-block to="/watch" nav-title="看板"></nav-block>
        <nav-block to="/login" nav-title="登录"></nav-block>
      </nav>
    </div>
  </header>
</template>
<script lang="ts" setup>
import NavBlock from "../components/header/nav-block.vue"
import layout from "../store/layout";
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
    position: fixed;
    width: 100vw;
    top: 0;
    transition: 0.3s;
    z-index: 99999;
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
  .hidden {
    top: -@nav-height;
  }
</style>
