<template>
  <header>
    <div id="header-left">
      <div id="header-logo">双高任务管理系统</div>
      <nav>
        <nav-block :to="item.path" :nav-title="item.meta.name" v-for="(item, index) in filter"
                   :key="item.path"></nav-block>
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
import {useRouter} from "vue-router";
import {computed, reactive} from "vue";
import layout from "../../store/layout";

const router = useRouter()
const exitAccount = () => {
  layout.mutation.logout()
}
const pId = Cookies.get("parentId")
const userInfo = Cookies.get("user")
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
let filter = computed(() => navList.filter((item: any) => !item.meta.hide))
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
