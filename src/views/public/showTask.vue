<template>
  <a-card title="查看任务">
    <div id="form">
      <div v-if="isLoading">
        <a-skeleton :paragraph="{ rows: 6 }" active />
      </div>
      <div v-else>
        <div class="title">
          <span>{{ all.title }}</span>
          <div class="buttons">
            <a-button type="primary" ghost @click="remindTask" :disabled="!canRemind" v-if="holder === Cookies.get('id')">督办</a-button>
            <a-button type="primary" ghost @click="back">返回</a-button>
          </div>
        </div>
        <a-descriptions bordered layout="vertical" size="default">
          <a-descriptions-item label="任务描述" :span="3">{{ all.subtitle ? all.subtitle : "暂无" }}</a-descriptions-item>
          <a-descriptions-item label="创建时间">{{ all.createdAt }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">{{ all.updatedAt }}</a-descriptions-item>
          <a-descriptions-item label="当前进度">
            <a-progress :percent="all.process" />
          </a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-badge status="processing" text="进行中" v-if="all.status === 0" />
            <a-badge status="default" text="审核中" v-else-if="all.status === 1" />
            <a-badge status="warning" text="被打回" v-else-if="all.status === 2" />
            <a-badge status="success" text="已完成" v-else-if="all.status === 3" />
            <!--
                  0: 进行中
                  1: 审核中
                  2: 被打回
                  3: 已完成
            -->
          </a-descriptions-item>
          <a-descriptions-item label="负责人" :span="2">
            <span v-for="(item, index) in worker" :key="item._id" id="worker">
              {{
                item.name
              }}
            </span>
          </a-descriptions-item>
        </a-descriptions>
        <div>
          <File-cpn :file="fileList" :id="taskid" :title="all.title" :ret="holder === Cookies.get('id')"></File-cpn>
        </div>
      </div>
    </div>
  </a-card>
  <a-back-top />
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { UploadOutlined } from '@ant-design/icons-vue';
import { useRoute, useRouter } from "vue-router";
import xhr from "../../xhr"
import FileCpn, { fileLists } from "../../components/public/fileComponents/fileList.vue"
import moment from "moment";
import { message } from "ant-design-vue";
import Cookies from "js-cookie";

const route = useRoute()
const router = useRouter()

interface workerList {
  name: string
  _id: string
}

let worker = reactive<workerList[]>([])
let fileList = reactive<fileLists[]>([])
const taskid = route.params.taskid as string
const holder = ref("")
interface all {
  title: string
  createdAt: string
  updatedAt: string
  subtitle: string | null
  process: number
  status: number
}

const all = reactive<all>({
  title: "",
  createdAt: "",
  updatedAt: "",
  subtitle: null,
  process: 0,
  status: 4
})

let isLoading = ref<boolean>(true)

xhr.get(`dean/getTask/${taskid}`)
  .then(config => {
    const task = config.data.data[0]
    holder.value = task.creator._id
    all.title = task.taskname
    all.createdAt = moment(task.createdAt).format("YYYY年MM月DD日 HH:mm:ss")
    all.updatedAt = moment(task.updatedAt).format("YYYY年MM月DD日 HH:mm:ss")
    all.process = task.process
    all.status = task.status

    all.subtitle = config.data.data[0].describe
    for (let i = 0; i < task.worker.length; i++) {
      worker.push(task.worker[i])
    }


    // 文件
    for (let i = 0; i < config.data.data[0].fileAddress.length; i++) {
      fileList.push(config.data.data[0].fileAddress[i])
    }
    isLoading.value = false
  }).catch(error => {
    console.log(error)
  })


let canRemind = ref<boolean>(true)

function remindTask() {
  if (canRemind.value) {
    xhr.post(`notice/remindTask/${taskid}`, {
      userId: Cookies.get("id")
    })
      .then(({ data }) => {
        if (data.status === 200) {
          message.success("督办成功！")
          canRemind.value = !canRemind
          setTimeout(() => {
            canRemind.value = true
          }, 300000)
        }
      })
      .catch(error => {
        console.warn(error)
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
      })
  } else {
    message.info("点太多次了！")
  }
}

function back() {
  router.go(-1)
}
</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 1200px;
}

#worker {
  margin: 0 3px;
}

.title {
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;

  .buttons {
    & > * {
      margin: 0 5px;
    }
  }
}
</style>
