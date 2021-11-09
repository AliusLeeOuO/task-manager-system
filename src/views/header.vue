<template>
  <header>
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block :to="item.path" :nav-title="item.meta.name" v-for="(item, index) in filter" :key="index"></nav-block>
      </nav>
    </div>
    <div id="header-right">
      <span>{{ position }}  {{ rofessional }}</span>
      &nbsp;&nbsp;
      <a href="javascript:void(0);" @click="exitAccount">退出</a>
    </div>
  </header>
</template>
<script lang="ts" setup>
import NavBlock from "../components/header/nav-block.vue"
import Cookies from 'js-cookie'
import {per0, per1, per2} from "../router/personConfig";
import {RouteRecordRaw, useRouter} from "vue-router";
import {computed, reactive} from "vue";

const router = useRouter()
const exitAccount = () => {
  Cookies.remove('token')
  Cookies.remove('position')
  Cookies.remove('rofessional')
  Cookies.remove('parentId')
  Cookies.remove('id')
  router.replace("/login")
}
const pId = Cookies.get("parentId")
const position = Cookies.get("position")
const rofessional = Cookies.get("rofessional")
let navList = reactive<any>([])
switch (pId) {
  case "0":
    navList = per0
    break
  case "1":
    navList = per1
    break
  case "2":
    navList = per2
    break
}
let filter = computed(()=> {
  return navList.filter((item: any) => {
    if (item.meta.hide !== true) {
      return true
    }
  })
})
</script>
<style lang="less" scoped>
@nav-height: 64px;
@main-color: #2286F7;
header {
  overflow: hidden;
  background-color: #fff;
  height: @nav-height;
  box-shadow: rgb(240, 241, 242) 0 2px 8px 0;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  position: fixed;
  width: 100vw;
  top: 0;
  transition: 0.3s;
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
