<!-- TODO: 文件：查看? 下载  总导出按钮-->
<!-- 完成： 时间 进度 描述 -->
<template>
  <a-card title="查看任务">
    <div id="form">
      <div v-if="isLoading">
        <a-skeleton :paragraph="{ rows: 6 }" active/>
      </div>
      <div v-else>
        <a-descriptions bordered layout="vertical" :title="`任务名称：${all.title}`" size="default">
          <a-descriptions-item label="任务描述" :span="3">{{ all.subtitle ? all.subtitle : "暂无" }}</a-descriptions-item>
          <a-descriptions-item label="创建时间">{{ all.createdAt }}</a-descriptions-item>
          <a-descriptions-item label="更新时间">{{ all.updatedAt }}</a-descriptions-item>
          <a-descriptions-item label="当前进度">{{ all.process }}%</a-descriptions-item>
          <a-descriptions-item label="状态">
            <a-badge status="processing" text="进行中"/>
          </a-descriptions-item>
          <a-descriptions-item label="负责人" :span="2"><span v-for="(item, index) in worker" :key="item._id" id="worker">{{
              item.name
            }}</span></a-descriptions-item>
        </a-descriptions>
        <h2>提交的文件（点击下载）</h2>
        <div>
          <File-cpn :file="fileList"></File-cpn>
        </div>
        <a-button @click="back">返回</a-button>
      </div>
    </div>
  </a-card>
</template>
<script lang="ts" setup>
import {reactive, ref} from "vue";
import {UploadOutlined} from '@ant-design/icons-vue';
import {useRoute, useRouter} from "vue-router";
import xhr from "../../xhr"
import FileCpn, {fileLists} from "../../components/public/fileData.vue"
import moment from "moment";

const route = useRoute()
const router = useRouter()


interface file {
  encoding: string
  fieldname: string
  filename: string
  mimetype: string
  originalname: string
  url: string
}

interface workerList {
  name: string
  _id: string
}

let taskSubTitle = ref<string>("")
let worker = reactive<workerList[]>([])
let fileList = reactive<fileLists[]>([])
const taskid = route.params.taskid

interface all {
  title: string
  createdAt: string
  updatedAt: string
  subtitle: string | null
  process: number
}

const all = reactive<all>({
  title: "",
  createdAt: "",
  updatedAt: "",
  subtitle: null,
  process: 0
})

let isLoading = ref<boolean>(true)

xhr.get(`dean/getTask/${taskid}`)
  .then(config => {
    const task = config.data.data[0]
    console.log(task)
    all.title = task.taskname
    all.createdAt = moment(task.createdAt).format("YYYY年MM月DD日 HH:mm:ss")
    all.updatedAt = moment(task.updatedAt).format("YYYY年MM月DD日 HH:mm:ss")
    all.process = task.process


    all.subtitle = config.data.data[0].describe
    // console.log(config.data.data[0].fileAddress)
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

function back() {
  router.go(-1)
}
</script>
<style lang="less" scoped>
#form {
  margin: 0 auto;
  max-width: 600px;
}

#worker {
  margin: 0 3px;
}
</style>
