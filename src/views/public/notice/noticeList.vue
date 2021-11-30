<template>
  <div id="lists">
    <div class="layout">
      <notice-layout-block
        :content="i.content"
        :time="i.time"
        title="通知"
        :sender="i.sender.name"
        :users="i.notifier"
        v-for="i in notice"
        :key="i.id"
        v-if="notice.length !== 0"
      ></notice-layout-block>
      <a-empty :image="simpleImage" v-else />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NoticeLayoutBlock from "./noticeLayoutBlock.vue"
import preLoad from "../../../store/preLoad";
import { Empty } from 'ant-design-vue';

preLoad.mutation.refreshNotice()
const notice = preLoad.state.notice
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE
</script>
<style lang="less" scoped>
</style>
