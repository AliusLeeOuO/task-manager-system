<template>
  <div id="out">
    <a-card title="我的任务">
      <show-table
        :api="`major/getTasks/${Cookies.get('id')}`"
        api-path="response.data.data.workerTask"
      ></show-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import Cookies from "js-cookie";
import ShowTable from "../../components/public/showTable.vue"
</script>
<style lang="less" scoped>
#out {
  & > * {
    margin-bottom: 20px;
  }
}
</style>
