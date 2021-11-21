<template>
  <header>
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block :to="item.path" :nav-title="item.meta.name" v-for="(item, index) in filter"
                   :key="item.path" :alert-count="item.meta.count?item.meta.count:undefined"></nav-block>
      </nav>
    </div>
    <div id="header-right">
      <span>{{ userInfo }}</span>
      &nbsp;&nbsp;
      <a href="javascript:void(0);" @click="exitAccount">退出</a>
    </div>
  </header>
</template>
<script lang="ts" setup>
import NavBlock from "../../components/header/nav-block.vue"
import Cookies from 'js-cookie'
import {per0, per1, per2} from "../../router/personConfig";
import publicRoute from "../../router/publicRoute";
import {useRouter, RouteRecordRaw} from "vue-router";
import {computed} from "vue";
import layout from "../../store/layout";
import preLoad from "../../store/preLoad";

const router = useRouter()
const exitAccount = () => {
  layout.mutation.logout()
}
const pId = Cookies.get("parentId")
const userInfo = Cookies.get("user")
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

const filter = computed(():any => {
  return preLoad.state.navList.filter((item: RouteRecordRaw) => {
    if (item.meta) {
      if (item.name === "examine") {
        item.meta.count = preLoad.state.examineList.length
      }
      return !item.meta.hide
    }
  })
})
preLoad.mutation.refreshExamine()
</script>
<style lang="less" scoped>
@nav-height: 64px;
@main-color: #2286F7;
header {
  overflow: hidden;
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
