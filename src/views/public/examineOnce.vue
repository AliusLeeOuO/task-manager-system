<template>
  <a-card title="审核">
    <div id="box">
      <h2>{{ taskInfo.taskname }}</h2>
      <p>
        负责人：
        <span
          v-for="i in taskInfo.worker"
          :key="i.id"
          id="worker"
        >{{ i.workerNumber }}{{ i.name }}</span>
      </p>
      <p>提交的文件：</p>
      <file-data :file="taskInfo.files"></file-data>
      <div id="btns">
        <a-button @click="pass" type="primary">审阅通过</a-button>
        <a-button @click="rtn" danger>打回</a-button>
        <a-button @click="goback">返回</a-button>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import xhr from "../../xhr"
import { useRoute, useRouter } from "vue-router";
import { createVNode, reactive } from "vue";
import FileData from "../../components/public/fileData.vue"
import { message, Modal } from "ant-design-vue";
import { QuestionCircleOutlined } from '@ant-design/icons-vue'
import preLoad from "../../store/preLoad";

const route = useRoute()
const router = useRouter()
const taskid = route.params.taskid

interface worker {
  id: string
  name: string
  workerNumber: number
}

interface taskInfo {
  taskname: string,
  worker: worker[]
  files: any[]
}

const taskInfo = reactive<taskInfo>({
  taskname: "",
  worker: [],
  files: []
})


// 获取任务信息
xhr.get(`examine/taskAuditOne/${taskid}`)
  .then(({ data }) => {
    taskInfo.taskname = data.data.taskname
    for (let i in data.data.taskId.fileAddress) {
      taskInfo.files.push(data.data.taskId.fileAddress[i])
    }
    for (let i in data.data.taskId.worker) {
      taskInfo.worker.push({
        id: data.data.taskId.worker[i]._id,
        name: data.data.taskId.worker[i].name,
        workerNumber: data.data.taskId.worker[i].workerNumber
      })
    }
    // 已读
    xhr.put(`examine/read/${taskid}`)
      .then(({ data }) => {
        // console.log(data)
      })
      .catch(error => {
        errors(error)
      })
  })
  .catch(error => {
    errors(error)
  })


//按钮操作
const goback = () => {
  router.go(-1)
}
const rtn = () => {
  Modal.confirm({
    title: () => '确认打回吗？',
    icon: () => createVNode(QuestionCircleOutlined),
    content: () => createVNode('div', { style: '' }, '确定要打回此审核吗？'),
    onOk() {
      xhr.put(`examine/returnAudit/${taskid}`)
        .then(({ data }) => {
          if ((data.status) === 200) {
            message.success("操作成功，正在返回")
            preLoad.mutation.refreshExamine(true)
            setTimeout(() => {
              router.go(-1)
            }, 300)
          }
        })
        .catch(err => {
          errors(err)
        })
    }
  })
}
const pass = () => {
  Modal.confirm({
    title: () => '确认通过吗？',
    icon: () => createVNode(QuestionCircleOutlined),
    content: () => createVNode('div', { style: '' }, '确定要通过此审核吗？'),
    onOk() {
      xhr.put(`examine/adoptAudit/${taskid}`)
        .then(({ data }) => {
          if ((data.status) === 200) {
            message.success("操作成功，正在返回")
            preLoad.mutation.refreshExamine(true)
            setTimeout(() => {
              router.go(-1)
            }, 300)
          }
        })
        .catch(err => {
          errors(err)
        })
    }
  })
}


const errors = (error: any) => {
  if (error.response) {
    // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
    message.error("响应错误")
  } else if (error.request) {
    // 请求已经成功发起，但没有收到响应
    message.error("服务端数据请求失败")
    console.log(error.request);
  } else {
    // 发送请求时出了点问题
    message.error("请求失败，致命错误")
    console.log('Error', error.message);
  }
}
</script>

<style lang="less" scoped>
#box {
  max-width: 600px;
  margin: 0 auto;

  #worker {
    margin: 0 5px;
  }

  #btns {
    & > * {
      margin: 0 5px;
    }
  }
}
</style>
