<template>
  <div id="layout">
    <div id="notice-class">
      <div class="header">
        通知中心
      </div>
      <div id="class-list">
        <router-link to="/notice/myNotice" class="class-block">我的通知</router-link>
        <router-link to="/notice/sendNotice" class="class-block">发送通知</router-link>
      </div>
    </div>
    <div id="notice-list">
      <div class="header">
        {{ route.meta.name }}
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {useRoute} from "vue-router";

const route = useRoute()

</script>
<style lang="less" scoped>
#layout {
  display: grid;
  grid-template-columns: 2fr 10fr;
  grid-gap: 20px;
  position: relative;

  & > * {
    border-radius: 5px;
    overflow: hidden;
  }

  .header {
    line-height: 48px;
    height: 48px;
    border-bottom: 1px solid #ccc;
    padding-left: 15px;
  }

  #notice-class {
    position: sticky;
    top: 80px;
    height: 90vh;
    background-color: #fff;

    #class-list {
      .class-block {
        padding: 10px;
        margin: 3px;
        border-radius: 5px;
        transition: 0.3s ease-in-out;
        cursor: pointer;
        display: block;

        &:hover {
          background-color: #E6F7FF;
        }
      }
    }
  }

  #notice-list {
    min-height: 90vh;
    overflow-y: auto;
    background-color: #fff;
  }

}
.router-link-active {
  background-color: #E6F7FF;
}
</style>
