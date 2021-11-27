<template>
  <div id="lists">
    <notice-layout-block :content="i.content"
                         :time="i.time"
                         title="通知"
                         :sender="i.sender.name"
                         :users="i.notifier"
                         v-for="i in notice"
                         :key="i.id"
    ></notice-layout-block>
  </div>
</template>
<script lang="ts" setup>
import NoticeLayoutBlock from "./noticeLayoutBlock.vue"
import preLoad from "../../../store/preLoad";

preLoad.mutation.refreshNotice()
const notice = preLoad.state.notice
</script>
<style lang="less" scoped>

</style>
