<template>
  <a-card title="查看任务">

    <div id="form">
      <div v-if="isLoading">
        <a-skeleton :paragraph="{ rows: 6 }" active/>
      </div>
      <div v-else>
        <h2>{{ taskTitle }}</h2>
        <p>任务描述： {{ taskSubTitle }}</p>
        <p>创建人：{{ creator }}</p>
        <p>负责人：<span v-for="(item, index) in worker" :key="item._id" id="worker">{{ item.name }}</span></p>
        <h3>该任务的子任务</h3>
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
import FileCpn from "../../components/public/fileData.vue"

const route = useRoute()
const router = useRouter()

interface fileList {
  describe: string
  userId: string
  _id: string
  files: file[]
}

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

let taskTitle = ref<string>("")
let taskSubTitle = ref<string>("")
let creator = ref<string>("")
let worker = reactive<workerList[]>([])
let fileList = reactive<fileList[]>([])
const taskid = route.params.taskid

let isLoading = ref<boolean>(true)

xhr.get(`dean/getTask/${taskid}`)
  .then(config => {
    taskTitle.value = config.data.data[0].taskname
    taskSubTitle.value = config.data.data[0].describe
    // console.log(config.data.data[0].fileAddress)
    for (let i = 0; i < config.data.data[0].worker.length; i++) {
      worker.push(config.data.data[0].worker[i])
    }


    // 文件
    for (let i = 0; i < config.data.data[0].fileAddress.length; i++) {
      fileList.push(config.data.data[0].fileAddress[i])
    }


    // creator.value = config.data.data[0].creator ? config.data.data[0].creator.name : "无"
    // if (config.data.data[0].fileAddress.length !== 0) {
    //   for (let i = 0; i < config.data.data[0].fileAddress.length; i++) {
    //     fileList.push({
    //       title: config.data.data[0].fileAddress[i].name,
    //       link: config.data.data[0].fileAddress[i].url
    //     })
    //   }
    // } else {
    //   fileList.push({
    //     title: "此处暂无文件",
    //     link: "javascript:void(0);"
    //   })
    // }

    isLoading.value = false
  }).catch(error => {
  console.log(error)
})

function back() {
  router.go(-1)
}


const activeKey = ref([]);
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
