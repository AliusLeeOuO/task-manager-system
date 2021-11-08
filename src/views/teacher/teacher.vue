<template>
  <a-card title="我的任务">
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
        <a-tag color="orange" v-else-if="status === 1">未完成</a-tag>
        <a-tag color="green" v-else-if="status === 2">已完成</a-tag>
      </template>
      <template #schedule="{ text: schedule }">
        <a-progress :percent="schedule" status="active"/>
      </template>
      <template #action="{ record }">
        <a href="javascript:void(0);" @click="submitTask(record.key)">查看</a>
        <span style="margin-left: 5px;"></span>
        <a href="javascript:void(0);" @click="modifyTask(record.key)">修改</a>
        <span style="margin-left: 5px;"></span>
        <a-popconfirm
          title="确定要删除这项任务吗？该操作无法撤回"
          ok-text="好"
          cancel-text="取消"
          @confirm="confirmRemove(record.key)"
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
import Cookies from "js-cookie";
import {message} from "ant-design-vue";

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

function modifyTask(tName: string) {
  router.push({
    path: "/modifyTask",
    query: {
      taskName: tName
    }
  })
}

network.get(`major/getTasks/${Cookies.get("id")}`).then(({data}) => {
  let tasks = data.data.workerTask
  // task:传进的任务对象   tableData: 表单数据
  function infinityChild(task: any, tableData: any, fatherSchedule: number = 0, isChildren: boolean = false) {
    for (let i = 0; i < task.length; i++) {
      if (isChildren) {
        tableData.push({
          key: task[i]._id
          , task: task[i].taskname
          , status: task[i].status
          , schedule: task[i].process ? task[i].process : fatherSchedule
          , endTime: task[i].endtime ? moment(task[i].endtime).format("YYYY年MM月DD日 HH:mm:ss") : "未设置"
          , isChildren: true
        })
      } else {
        tableData.push({
          key: task[i]._id
          , task: task[i].taskname
          , status: task[i].status
          , schedule: task[i].process ? task[i].process : fatherSchedule
          , endTime: task[i].endtime ? moment(task[i].endtime).format("YYYY年MM月DD日 HH:mm:ss") : "未设置"
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

  infinityChild(tasks, tableData)
}).catch(error => {
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
// const newTask = () => {
//   router.push("/newTask")
// }


const confirmRemove = (key: string) => {
  network.delete(`major/getTasks/${key}`).then(config => {
    const status = config.data
    if (status.status === 200) {
      tableData.splice(tableData.indexOf(tableData.filter(item => {
        if (item.key === key) {
          return true
        }
      })[0]), 1)
      message.success('删除成功！');
    }
  }).catch(error => {
    console.log(error)
  })
}
</script>
<style lang="less" scoped>
</style>
