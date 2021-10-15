<template>
  <a-card title="任务列表">
    <div id="alert-block" v-if="alert">
      <a-alert :message="alert" type="success" @close="alertClose" closable/>
    </div>
    <a-button type="primary" @click="newTask">新建任务</a-button>
    <span style="margin-left: 5px;"></span>
    <a-radio-group v-model:value="showTable">
      <a-radio-button value="3">全部</a-radio-button>
      <a-radio-button value="0">未开始</a-radio-button>
      <a-radio-button value="1">未完成</a-radio-button>
      <a-radio-button value="2">已完成</a-radio-button>
    </a-radio-group>
    <a-table :columns="columns" :data-source="filterTable">
      <template #status="{ text: status }">
        <a-tag color="blue" v-if="status === 0">未开始</a-tag>
        <a-tag color="orange" v-if="status === 1">未完成</a-tag>
        <a-tag color="green" v-if="status === 2">已完成</a-tag>
      </template>
      <template #schedule="{ text: schedule }">
        <a-progress :percent="schedule" status="active"/>
      </template>
      <template #action="{ record }">
        <a href="javascript:void(0);" @click="submitTask(record.key)" v-if="!record.isChildren">查看</a>
        <span style="margin-left: 5px;"></span>
        <a-popconfirm
          title="确定要删除这项任务吗？该操作无法撤回"
          ok-text="好"
          cancel-text="取消"
          @confirm="confirmRemove(record.key)"
          v-if="!record.isChildren"
        >
          <a href="javascript:void(0);">删除</a>
        </a-popconfirm>

      </template>
    </a-table>
  </a-card>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import network from "../../network/index"
import moment from "moment";
import {computed, reactive, ref} from "vue";


const router = useRouter()
const columns = [
  {
    title: '任务标题'
    , dataIndex: 'task'
    , key: 'task'
    , width: "45%"
  },
  {
    title: '状态'
    , dataIndex: 'status'
    , slots: {customRender: 'status'}
    , key: 'status'
  }, {
    title: '结束时间'
    , dataIndex: 'endTime'
    , key: 'endTime'
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
  status?: string | number
  isChildren?: boolean
  endTime: string
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
}

network.get("dean/getTasks").then(response => {
  let task = response.data.data.task

  // task:传进的任务对象   tableData: 表单数据
  function infinityChild(task: any, tableData: any, fatherSchedule: number = 0, isChildren: boolean = false) {
    for (let i = 0; i < task.length; i++) {
      if (isChildren) {
        tableData.push({
          key: task[i]._id
          , task: task[i].taskname
          , status: task[i].status
          , schedule: task[i].process ? task[i].process : fatherSchedule
          , endTime: moment(task[i].endtime).format("YYYY年MM月DD日 HH:mm:ss")
          , isChildren: true
        })
      } else {
        tableData.push({
          key: task[i]._id
          , task: task[i].taskname
          , status: task[i].status
          , schedule: task[i].process ? task[i].process : fatherSchedule
          , endTime: moment(task[i].endtime).format("YYYY年MM月DD日 HH:mm:ss")
        })
      }
      if (task[i].children && task[i].children.length !== 0) {
        tableData[i].children = []
        let childTask = task[i].children
        let childTable = tableData[i].children
        infinityChild(childTask, childTable, task[i].process, true)
      }
    }
  }

  infinityChild(task, tableData)
}).catch((error) => {
  console.warn(error)
})

let showTable = ref<string>("3")
let filterTable = computed(function () {
  return tableData.filter(item => {
    switch (showTable.value) {
      case "2":
        if (item.status === 2) {
          return true
        }
        break
      case "1":
        if (item.status === 1) {
          return true
        }
        break
      case "0":
        if (item.status === 0) {
          return true
        }
        break
      case "3":
        return true
    }
  })
})
const newTask = () => {
  router.push("/newTask")
}
let alert = ref<string>("")

function alertClose() {
  alert.value = ""
}

const confirmRemove = (key: string) => {
  network.delete(`dean/deleteTask/${key}`).then(config => {
    const status = config.data
    if (status.status === 200) {
      tableData.splice(tableData.indexOf(tableData.filter(item => {
        if (item.key === key) {
          return true
        }
      })[0]), 1)
      alert.value = "刪除成功"
    }
  }).catch(error => {
    console.log(error)
  })
}
</script>
<style lang="less" scoped>
#alert-block {
  margin: 0 auto 10px;
}
</style>
