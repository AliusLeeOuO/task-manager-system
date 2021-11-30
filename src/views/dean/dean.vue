<template>
  <div id="out">
    <a-card title="任务列表">
      <show-table api="dean/getTasks" :new-task-btn="false" api-path="response.data.data.task"></show-table>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import ShowTable from "../../components/public/showTable.vue"
</script>
<style lang="less" scoped>
#out {
  & > * {
    margin-bottom: 20px;
  }
}
</style>
