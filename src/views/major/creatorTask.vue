<template>
  <a-card title="我创建的任务">
    <show-table
      :api="`major/getTasks/${Cookies.get('id')}`"
      :new-task-btn="false"
      api-path="response.data.data.creatorTask"
    ></show-table>
  </a-card>
</template>
<script lang="ts" setup>
import ShowTable from "../../components/public/showTable.vue"
import { useRouter } from "vue-router";
import Cookies from "js-cookie";

const router = useRouter()


</script>
<style lang="less" scoped>
</style>
