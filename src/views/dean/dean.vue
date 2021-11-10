<template>
  <a-card title="任务列表">
    <show-table api="dean/getTasks" :new-task-btn="false" api-path="response.data.data.task"></show-table>
  </a-card>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import preLoad from "../../store/preLoad";
import ShowTable from "../../components/public/showTable.vue"

const router = useRouter()

// preLoad
preLoad.mutation.preLoadPerson("dean/position")
</script>
<style lang="less" scoped>
</style>
