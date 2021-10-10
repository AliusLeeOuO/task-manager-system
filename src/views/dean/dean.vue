<template>
  <a-card title="任务列表">
    <a-table :columns="columns" :data-source="tableData">
      <template #schedule="{ text: schedule }">
        <a-progress :percent="schedule" status="active"/>
      </template>
      <template #action="{ record }">
        <a href="javascript:void(0);" @click="submitTask(record.key)">查看任务</a>
      </template>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import network from "../../network/index"
import moment from "moment";
import {reactive} from "vue";

const router = useRouter()
const columns = [
  {
    title: '任务标题'
    , dataIndex: 'task'
    , key: 'task'
    , width: "55%"
  },
  {
    title: '下发时间'
    , dataIndex: 'releaseTime'
    , key: 'releaseTime'
  },
  {
    title: '进度'
    , dataIndex: 'schedule'
    , key: 'schedule'
    , slots: {customRender: 'schedule'}
    , width: '15%'
  },
  {
    title: '操作'
    , dataIndex: 'action'
    , key: 'action'
    , slots: {customRender: 'action'}
  }
]

interface tableItem {
  key: string
  task: string
  schedule?: number
  releaseTime: string
  children?: tableItem[]
}

const tableData: tableItem[] = reactive([])

function submitTask(tName: string) {
  router.push({
    path: "/showTask",
    query: {
      taskName: tName
    }
  })
  console.log(tName)
}

network.get("dean/getTasks").then((response) => {
  let task = response.data.data.task

  // task:传进的任务对象   tableData: 表单数据
  function infinityChild(task: any, tableData: any) {
    for (let i = 0; i < task.length; i++) {
      tableData.push({
        key: task[i]._id
        , task: task[i].taskname
        , schedule: task[i].process
        , releaseTime: moment(task[i].createdAt).format("YYYY年MM月DD日 HH:mm:ss")
      })
      if (task[i].children && task[i].children.length !== 0) {
        tableData[i].children = []
        let childTask = task[i].children
        let childTable = tableData[i].children
        infinityChild(childTask, childTable)
      }
    }
  }

  infinityChild(task, tableData)
}).catch((error) => {
  console.warn(error)
})

</script>
<style lang="less" scoped>

</style>
