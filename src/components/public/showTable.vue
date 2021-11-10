<template>
  <div id="top-buttons">
    <a-button type="primary" @click="newTask" v-if="props.newTaskBtn">新建任务</a-button>
    <span>任务分类（状态）</span>
    <a-radio-group v-model:value="showTable">
      <a-radio-button value="3">全部</a-radio-button>
      <a-radio-button value="0">未开始</a-radio-button>
      <a-radio-button value="1">未完成</a-radio-button>
      <a-radio-button value="2">已完成</a-radio-button>
    </a-radio-group>
  </div>
  <a-table :columns="columns" :data-source="filterTable">
    <template #status="{ text: status }">
      <a-tag color="blue" v-if="status === 0">未开始</a-tag>
      <a-tag color="orange" v-else-if="status === 1">未完成</a-tag>
      <a-tag color="green" v-else-if="status === 2">已完成</a-tag>
    </template>
    <template #schedule="{ text: schedule }">
      <a-progress :percent="schedule"/>
    </template>
    <template #action="{ record }">
      <div id="operation-button">
        <a href="javascript:void(0);" @click="showTask(record.key)">查看</a>
        <a href="javascript:void(0);" @click="modifyTask(record.key)" v-if="!record.isChildren">修改</a>
        <a href="javascript:void(0);" @click="addChildTask(record.key)" v-if="!record.isChildren">新建子任务</a>
        <a-popconfirm
          title="确定要删除这项任务吗？该操作无法撤回"
          ok-text="好"
          cancel-text="取消"
          @confirm="confirmRemove(record.key)"
          v-if="!record.isChildren"
        >
          <a href="javascript:void(0);">删除</a>
        </a-popconfirm>
      </div>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router";
import network from "../../network/index"
import moment from "moment";
import {computed, ref} from "vue";
import preLoad from "../../store/preLoad";
import {message} from "ant-design-vue";

const props = defineProps<{
  newTaskBtn: boolean,
  api: string,
  apiPath: string
}>()

const newTask = () => {
  router.push("/newTask")
}

const router = useRouter()
const columns = [
  {
    title: '任务标题'
    , dataIndex: 'task'
    , key: 'task'
    , width: "45%"
  }, {
    title: '状态'
    , dataIndex: 'status'
    , slots: {customRender: 'status'}
    , key: 'status'
  }, {
    title: '结束时间'
    , dataIndex: 'endTime'
    , key: 'endTime'
  }, {
    title: '进度'
    , dataIndex: 'schedule'
    , key: 'schedule'
    , slots: {customRender: 'schedule'}
    , width: '15%'
  }, {
    title: '操作'
    , dataIndex: 'action'
    , key: 'action'
    , slots: {customRender: 'action'}
  }
]

refreshTask()

let showTable = ref<string>("3")
let filterTable = computed(function () {
  return preLoad.state.allTasks.filter(item => {
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

function refreshTask(force?: boolean) {
  if (preLoad.state.allTasks.length === 0 || force) {
    network.get(props.api).then(response => {
      preLoad.state.allTasks = []
      let task
      switch (props.apiPath) {
        // dean
        case "response.data.data.task":
          task = response.data.data.task
          break
        // major
        case "response.data.data.workerTask":
          task = response.data.data.workerTask
          break
        case "response.data.data.creatorTask":
          task = response.data.data.creatorTask
          break
      }
      infinityChild(task, preLoad.state.allTasks)
    }).catch(error => {
      message.warn(error)
      console.warn(error)
    })
  }
}


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


// 查看
const showTask = (key: string) => {
  router.push(`/showTask/${key}`)
}

// 修改
const modifyTask = (key: string) => {
  router.push({
    path: `/modifyTask/${key}`,
    query: {
      taskName: key
    }
  })
}

//分解
const addChildTask = (key: string) => {
  router.push(`/addChildTask/${key}`)
}

// 删除
const confirmRemove = (key: string) => {
  network.delete(`dean/deleteTask/${key}`).then(config => {
    const status = config.data
    if (status.status === 200) {
      refreshTask(true)
      message.success('删除成功！');
    }
  }).catch(error => {
    console.log(error)
  })
}

</script>
<style lang="less" scoped>
#top-buttons {
  margin-bottom: 10px;

  & > * {
    margin-right: 10px;
  }
}

#operation-button {
  & > * {
    margin: 0 3px;
  }
}
</style>
