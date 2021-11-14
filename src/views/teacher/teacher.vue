<template>
  <a-card title="我的任务">
    <show-table :api="`teacher/getTasks/${Cookies.get('id')}`" :new-task-btn="false"
                api-path="response.data.data.workerTask"></show-table>
  </a-card>
</template>
<script lang="ts" setup>
import ShowTable from "../../components/public/showTable.vue"
import {useRouter} from "vue-router";
import Cookies from "js-cookie";
import preLoad from "../../store/preLoad";

const router = useRouter()

// preLoad
preLoad.mutation.preLoadPerson("teacher/position")
</script>
<style lang="less" scoped>
</style>
