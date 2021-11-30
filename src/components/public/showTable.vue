<template>
  <div id="top-buttons">
    <div id="buttons">
      <a-button type="primary" @click="newTask" v-if="props.newTaskBtn">新建任务</a-button>
      <span>任务分类（状态）</span>
      <a-radio-group v-model:value="showTable">
        <a-radio-button value="4">全部</a-radio-button>
        <a-radio-button value="0">进行中</a-radio-button>
        <a-radio-button value="1">审核中</a-radio-button>
        <a-radio-button value="2">被打回</a-radio-button>
        <a-radio-button value="3">已完成</a-radio-button>
      </a-radio-group>
    </div>
    <div id="search">
      <a-input-search
        placeholder="输入以搜索顶级任务..."
        style="width: 200px"
        v-model:value="searchString"
        @search="onSearch"
      />
    </div>
  </div>
  <a-table :columns="columns" :data-source="filterTable" :loading="isLoading">
    <template #status="{ text: status }">
      <a-tag color="blue" v-if="status === 0">进行中</a-tag>
      <a-tag v-else-if="status === 1">审核中</a-tag>
      <a-tag color="orange" v-else-if="status === 2">被打回</a-tag>
      <a-tag color="green" v-else-if="status === 2">已完成</a-tag>
      <!--
                  0: 进行中
                  1: 审核中
                  2: 被打回
                  3: 已完成
       -->
      <a-tag v-else>未知</a-tag>
    </template>
    <template #schedule="{ text: schedule }">
      <a-progress :percent="schedule"/>
    </template>
    <template #action="{ record }">
      <div id="operation-button">
        <div v-if="manager()">
          <a href="javascript:void(0);" @click="showTask(record.id)">查看</a>
          <a href="javascript:void(0);" @click="modifyTask(record.id)" v-if="!record.isChildren">修改</a>
          <a
            href="javascript:void(0);"
            @click="addChildTask(record.id, record.task)"
            v-if="!record.isChildren && Cookies.get('parentId') === '0'"
          >新建子任务</a>
          <a-popconfirm
            title="确定要删除这项任务吗？该操作无法撤回"
            ok-text="好"
            cancel-text="取消"
            @confirm="confirmRemove(record.id)"
            v-if="!record.isChildren"
          >
            <a href="javascript:void(0);">删除</a>
          </a-popconfirm>
        </div>
        <div v-else>
          <a href="javascript:void(0);" @click="showTask(record.id)">查看</a>
          <a
            href="javascript:void(0);"
            @click="addChildTask(record.id, record.task)"
            v-if="!record.isChildren"
          >新建子任务</a>
          <a
            href="javascript:void(0);"
            @click="submitTask(record.id,record.lastTask)"
            v-if="!record.isChildren"
          >提交材料</a>
        </div>
      </div>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import {onBeforeRouteLeave, useRouter} from "vue-router";
import xhr from "../../xhr/index"
import moment from "moment";
import {ExclamationCircleOutlined} from '@ant-design/icons-vue';
import {computed, createVNode, ref} from "vue";
import preLoad from "../../store/preLoad";
import {message, Modal} from "ant-design-vue";
import Cookies from "js-cookie";

const props = defineProps<{
  newTaskBtn: boolean,
  api: string,
  apiPath: string
}>()

const container = props.apiPath === "response.data.data.task" || props.apiPath === "response.data.data.creatorTask" ?
  preLoad.state.manageTasks : preLoad.state.myTasks


const newTask = () => {
  router.push("/newTask")
}
let isLoading = ref<boolean>(true)
onBeforeRouteLeave((to, form) => {
  isLoading.value = true
})
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

// 过滤器
let showTable = ref<string>("4")
let searchString = ref<string>('')
const onSearch = (searchValue: string) => {
  console.log(`search ${searchValue}`)
}
const filterTable = computed(function () {
  return container.filter((item: any) => {
    /*
                  0: 进行中
                  1: 审核中
                  2: 被打回
                  3: 已完成
      */
    switch (showTable.value) {
      case "0":
        if (item.status === 0 && item.task.indexOf(searchString.value) !== -1) {
          return true
        }
        break
      case "1":
        if (item.status === 1 && item.task.indexOf(searchString.value) !== -1) {
          return true
        }
        break
      case "2":
        if (item.status === 2 && item.task.indexOf(searchString.value) !== -1) {
          return true
        }
        break
      case "3":
        if (item.status === 3 && item.task.indexOf(searchString.value) !== -1) {
          return true
        }
        break
      case "4":
        if (item.task.indexOf(searchString.value) !== -1)
          return true
    }
  })
})

//搜索框
const manager = () => {
  return props.apiPath === "response.data.data.task" || props.apiPath === "response.data.data.creatorTask";
}

function refreshTask(force?: boolean) {
  if (container.length === 0 || force) {
    xhr.get(props.api, {
      params: {
        skipNumber: 0,
        limitNumber: 99999999
      }
    }).then(response => {
      container.splice(0, container.length)
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
      infinityChild(task, container)
      isLoading.value = false
    }).catch(error => {
      console.log(error)
    })
  } else {
    isLoading.value = false
  }
}

let keyIndex: number = 0

// task:传进的任务对象   tableData: 表单数据
function infinityChild(task: any, tableData: any, fatherSchedule: number = 0, isChildren: boolean = false) {
  for (let i = 0; i < task.length; i++) {
    keyIndex++
    if (isChildren) {
      tableData.push({
        key: keyIndex
        , id: task[i]._id
        , task: task[i].taskname
        , status: task[i].status
        , schedule: task[i].process ? task[i].process : fatherSchedule
        , endTime: task[i].endtime ? moment(task[i].endtime).format("YYYY年MM月DD日 HH:mm:ss") : "未设置"
        , isChildren: true
      })
    } else {
      tableData.push({
        key: keyIndex
        , id: task[i]._id
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
    } else {
      tableData[tableData.length - 1].lastTask = true
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
    path: `/modifyTask/${key}`
  })
}
//分解
const addChildTask = (key: string, taskName: string) => {
  router.push({
    path: `/addChildTask/${key}`,
    query: {
      taskName: taskName
    }
  })
}
// 提交任务
const submitTask = (key: string,last: boolean = false) => {
  router.push({
    path: `/submit/${key}`,
    query: {
      last: (`${last}` as string)
    }
  })
}
// 删除
const confirmRemove = (key: string): void => {
  Modal.confirm({
    title: () => '您确定真的要删除吗？',
    icon: () => createVNode(ExclamationCircleOutlined),
    content: () => createVNode('div', {style: 'color:red;'}, '此操作非常危险，请再次确认是否执行该操作。'),
    onOk() {
      xhr.delete(`dean/deleteTask/${key}`, {
        data: {
          userId: Cookies.get("id")
        }
      }).then(config => {
        const status = config.data
        if (status.status === 200) {
          refreshTask(true)
          message.success('删除成功！');
        }
      }).catch(error => {
        console.log(error)
      })
    }
  });
}


</script>
<style lang="less" scoped>
#top-buttons {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;

  & > * {
    margin-right: 10px;
  }
}

#operation-button {
  & > div {
    & > * {
      margin: 0 3px;
    }
  }
}
</style>
