<template>
  <a-card title="任务列表">
    <show-table api="dean/getTasks" :new-task-btn="true"></show-table>
  </a-card>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import network from "../../network/index"
import preLoad from "../../store/preLoad";
import ShowTable from "../../components/public/showTable.vue"

const router = useRouter()


// preLoad
network.post("https://quanquan.asia/web/api/dean/position").then(({data}) => {
  let list = data.data
  preLoad.state.personList = []
  for (let i = 0; i < list.length; i++) {
    preLoad.state.personList.push({
      value: list[i]._id,
      label: list[i].name
    })
  }
})
</script>
<style lang="less" scoped>
</style>
