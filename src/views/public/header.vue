<template>
  <header>
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block
          :to="item.path"
          :nav-title="item.meta.name"
          v-for="item in filter"
          :key="item.path"
          :alert-count="item.meta.count ? item.meta.count : undefined"
          :extend="false"
        ></nav-block>
      </nav>
    </div>
    <div id="header-right">
      <nav-block to="/notice" nav-title="通知" extend></nav-block>
      <user-content></user-content>
    </div>
  </header>
</template>
<script lang="ts" setup>
import NavBlock from "../../components/header/nav-block.vue"
import Cookies from 'js-cookie'
import { per0, per1, per2 } from "@/router/personConfig";
import publicRoute from "../../router/publicRoute";
import { useRouter, RouteRecordRaw } from "vue-router";
import { computed } from "vue";
import preLoad from "../../store/preLoad";
import UserContent from "@/components/header/userContent.vue"

const router = useRouter()

const pId = Cookies.get("parentId")
switch (pId) {
  case "0":
    for (let i in per0) {
      preLoad.state.navList.push(per0[i])
    }
    break
  case "1":
    for (let i in per1) {
      preLoad.state.navList.push(per1[i])
    }
    break
  case "2":
    for (let i in per2) {
      preLoad.state.navList.push(per2[i])
    }
    break
}
for (let i in publicRoute) {
  preLoad.state.navList.push(publicRoute[i])
}

const filter = computed((): any => {
  return preLoad.state.navList.filter((item: RouteRecordRaw) => {
    if (item.meta) {
      return !item.meta.hide
    }
  })
})


// 通知小红点


</script>
<style lang="less" scoped>
@nav-height: 64px;
@main-color: #2286f7;
header {
  background-color: #fff;
  height: @nav-height;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 10%);
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: fixed;
  width: 100vw;
  top: 0;
  z-index: 2;

  & > * {
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

  #header-right {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
