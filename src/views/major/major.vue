<template>
  <Card title="我的任务">
<!--    <a-card title="我的任务">-->
      <show-table :api="`major/getTasks/${Cookies.get('id')}`" :new-task-btn="false"
                  api-path="response.data.data.workerTask"></show-table>
<!--    </a-card>-->
  </Card>
</template>
<script lang="ts" setup>
import ShowTable from "../../components/public/showTable.vue"
import {useRouter} from "vue-router";
import Cookies from "js-cookie";
import preLoad from "../../store/preLoad";

const router = useRouter()

import Card from "../../components/public/card.vue"

// preLoad
preLoad.mutation.preLoadPerson("major/position")
</script>
<style lang="less" scoped>
</style>
