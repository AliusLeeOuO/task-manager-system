<template>
  <div id="out">
    <a-card title="我的任务">
      <show-table
        :api="`major/getTasks/${Cookies.get('id')}`"
        :new-task-btn="false"
        api-path="response.data.data.workerTask"
      ></show-table>
    </a-card>
    <a-card title="日志">
      <notice></notice>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import ShowTable from "../../components/public/showTable.vue"
import Notice from "../public/notice/notice.vue"

const router = useRouter()
</script>
<style lang="less" scoped>
#out {
  & > * {
    margin-bottom: 20px;
  }
}
</style>
